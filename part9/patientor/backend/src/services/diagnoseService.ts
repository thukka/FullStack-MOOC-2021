import diagnoseData from '../../data/diagnoses.json';
import { DiagnoseInterface } from '../types';

const diagnoses: Array<DiagnoseInterface> = diagnoseData;

const getDiagnoses = (): Array<DiagnoseInterface> => {
    return diagnoses;
};

const addDiagnose = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnose
};