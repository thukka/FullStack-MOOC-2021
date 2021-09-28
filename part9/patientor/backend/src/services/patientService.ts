import patientData from '../../data/patients.json';
import { Patient, SensitivePatientData } from '../types';

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

export default {
    getPatients,
    getSensitivePatientData
};