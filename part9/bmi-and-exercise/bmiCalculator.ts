interface Values {
    height: number,
    weight: number
}

const parseArg = (args: Array<string>): Values => {
    if (args.length < 4) throw new Error('not enough arguments!');
    if (args.length > 4) throw new Error('too many arguments!');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('values are not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) * (height / 100));

    if (bmi < 19) {
        return 'Underweight (bmi is less than 19)';
    } else if (bmi < 24.9) {
        return 'Normal weight (bmi between 19 and 24.9)';
    } else if (bmi > 24.9) {
        return 'Overweight (bmi over 24.9)';
    } else {
        throw new Error('Something went wrong!');
    }
};

try {
    const { height, weight } = parseArg(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Something went wrong: ', e);
}