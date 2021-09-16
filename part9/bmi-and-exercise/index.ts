/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const body = req.query;

    if (!body.height || !body.weight) {
        return res.status(403).json({ error: 'Invalid query, check that height and weight are included' });
    }

    if (isNaN(Number(body.height)) || isNaN(Number(body.weight))) {
        return res.status(403).json({ error: 'Invalid parameters, check that only numbers are used' });
    }

    const bmi = calculateBmi(Number(body.height), Number(body.weight));
    const responseObj = {
        height: body.height,
        weight: body.weight,
        bmi: bmi
    };
    return res.send(responseObj);
});

app.post('/exercise', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, days } = req.body;

    if (!target || !days) {
        return res.status(403).json({ error: 'Parameters missing' });
    }

    if (isNaN(Number(target))) {
        return res.status(403).json({ error: 'Malformatted parameters' });
    }

    for (let i = 0; i < days.length; i++) {
        if (isNaN(Number(days[i]))) {
            return res.status(403).json({ error: 'Malformatted parameters' });
        }
    }

    const calculate = calculateExercises(days, target);
    return res.send(calculate);

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});