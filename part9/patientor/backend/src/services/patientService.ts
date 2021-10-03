import patientData from '../../data/patients.json';
import { Patient, SensitivePatientData, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getSensitivePatientData = (): SensitivePatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatients = (): Array<Patient> => {
    return patientData;
};

const addPatient = (patient: NewPatient): Patient => {
    const newId: string = uuid();
    const newPatient = { ...patient, id: newId};
    console.log('newPatient: ', newPatient);
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getSensitivePatientData,
    addPatient
};