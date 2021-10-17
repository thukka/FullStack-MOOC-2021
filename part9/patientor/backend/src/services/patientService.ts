import patientData from '../../data/patients';
import { Patient, SensitivePatientData, NewPatient, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getSensitivePatientData = (): SensitivePatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatients = (): Array<Patient> => {
    return patientData;
};

const getPatientInfo = (id: string): Patient | undefined => {
    const findPatient = patientData.find(p => p.id === id);
    return findPatient;
};

const addPatient = (patient: NewPatient): Patient => {
    const newId: string = uuid();
    const newPatient = { ...patient, id: newId, entries: []};
    patientData.push(newPatient);
    return newPatient;
};

const addNewEntry = (patientId: string, entryData: Entry): Patient | undefined => {
    const patient = getPatientInfo(patientId);

    if (!patient) {
        throw new Error('patient not found');
    }

    patient.entries.push(entryData);
    return patient;
};

export default {
    getPatients,
    getSensitivePatientData,
    addPatient,
    getPatientInfo,
    addNewEntry
};