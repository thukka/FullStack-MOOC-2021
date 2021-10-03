import express from 'express';
import patientService from '../services/patientService';
import { NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getSensitivePatientData());
});

router.post('/', (req, res) => {
    const values: unknown = req.body;
    const addPatient = patientService.addPatient(values as NewPatient);
    res.send(addPatient);
});

export default router;