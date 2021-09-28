import express from 'express';
import cors from 'cors';
import diagnoseRouter from './src/routes/diagnoseRouter';
import patientRouter from './src/routes/patientRouter';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged');
    res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});