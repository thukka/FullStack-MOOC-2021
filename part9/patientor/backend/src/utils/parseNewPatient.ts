import { NewPatient, Gender } from '../types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error('Incorrect or missing something' + str);
    }
    return str;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
};


type Fields = { name: unknown, occupation: unknown, gender: unknown, ssn: unknown, dateOfBirth: unknown, entries: unknown };

const toNewPatient = ({ name, occupation, gender, ssn, dateOfBirth }: Fields): NewPatient => {

    const newPatient: NewPatient = {
        name: parseString(name),
        occupation: parseString(occupation),
        gender: parseGender(gender),
        ssn: parseString(ssn),
        dateOfBirth: parseString(dateOfBirth),
    };

    return newPatient;
};

export default toNewPatient;