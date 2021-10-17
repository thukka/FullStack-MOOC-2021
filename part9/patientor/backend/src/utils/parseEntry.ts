import { Diagnosis, Entry, BaseEntry, HealthCheckRating, OccupationalHealthcareEntry } from '../types';
import diagnoses from '../../data/diagnoses.json';

//string
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error('Incorrect or missing something ' + str);
    }
    return str;
};

//date
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date ' + date);
    }
    return date;
};

//diagnosis codes + arr
const isArray = (arr: unknown): arr is Array<Diagnosis['code']> => {
    return Array.isArray(arr) && arr.every((entry) => isString(entry) && diagnoses.find((d) => d.code === entry));
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
    if (!codes || !isArray(codes)) {
        throw new Error('Diagnosis codes incorrect or missing ' + codes);
    }
    return codes;
};
// healthCheckRating
const isHealthRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isHealthRating(rating)) {
        throw new Error('Incorrect or missing health check rating' + rating);
    }
    return rating;
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
//type check
const isType = (param: string): param is 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
    return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): Entry => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const type = object.type;

    if (!object || !isType(type)) {
        throw new Error('No object or invalid object type!');
    }

    const entry: BaseEntry = {
        id: parseString(object.id),
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
    };

    if (object.diagnosisCodes) {
        entry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }

    switch (type) {
        case 'HealthCheck':
            return {
                ...entry,
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            };
        case 'OccupationalHealthcare':
            let occupationalObject: OccupationalHealthcareEntry = {
                ...entry,
                type: 'OccupationalHealthcare',
                employerName: parseString(object.employerName)
            };

            if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
                occupationalObject = {
                    ...occupationalObject,
                    sickLeave: {
                        startDate: parseDate(object.sickLeaveStartDate),
                        endDate: parseDate(object.sickLeaveEndDate)
                    }
                };
            }
            return occupationalObject;
        case 'Hospital':
            return {
                ...entry,
                type: 'Hospital',
                discharge: {
                    date: parseDate(object.dischargeDate),
                    criteria: parseString(object.dischargeCriteria)
                }
            };
        default:
            return assertNever(type);
    }
};

export default toNewEntry;