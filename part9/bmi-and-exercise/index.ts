import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    let body = req.query;

    if (!body.height || !body.weight) {
        return res.status(403).json({ error: 'Invalid query, check that height and weight are included' });
    }

    if (isNaN(Number(body.height)) || isNaN(Number(body.weight))) {
        return res.status(403).json({ error: 'Invalid parameters, check that only numbers are used' });
    }

    const bmi = calculateBmi(Number(body.height), Number(body.weight))
    const responseObj = {
        height: body.height,
        weight: body.weight,
        bmi: bmi
    }
    return res.send(responseObj)
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});