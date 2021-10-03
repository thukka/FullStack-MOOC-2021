import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getSensitivePatientData());
});

router.post('/', (req, res) => {
    try {
    const newPatientEntry = toNewPatient(req.body);
    const addPatient = patientService.addPatient(newPatientEntry);
    res.send(addPatient);
    } catch ( { message }) {
        res.status(400).send(message);
    }
});

export default router;