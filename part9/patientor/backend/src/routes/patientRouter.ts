import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/parseNewPatient';
import toNewEntry from '../utils/parseEntry';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getSensitivePatientData());
});

router.get('/:id', (req, res) => {
    const patientToFind = req.params.id;
    const patient = patientService.getPatientInfo(patientToFind);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatient(req.body);
        const addPatient = patientService.addPatient(newPatientEntry);
        res.send(addPatient);
    } catch ({ message }) {
        res.status(400).send(message);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const patientId = req.params.id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const payload = toNewEntry(req.body);
        console.log('body:', payload);
        const addEntry = patientService.addNewEntry(patientId, payload);
        res.send(addEntry);
        
    } catch ({ message }) {
        res.status(400).send(message);
    }
});

export default router;