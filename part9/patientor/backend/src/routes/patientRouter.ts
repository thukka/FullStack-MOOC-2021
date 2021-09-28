import express from 'express';
import patientRouter from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientRouter.getSensitivePatientData());
});

export default router;