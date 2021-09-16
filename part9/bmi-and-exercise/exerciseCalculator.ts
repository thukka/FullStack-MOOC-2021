interface Result {
    totalDays: number,
    trainedDays: number,
    totalHours: number,
    average: number,
    originalTarget: number,
    success: boolean,
    rating: number,
    ratingDescription: string
}

interface InputValues {
    days: Array<number>,
    target: number,
}

const parseArgs = (args: Array<string>): InputValues => {
    const target = Number(args[2]);
    if (isNaN(target)) throw new Error('Target was not a number');

    const days: Array<number> = args.slice(3).map((n) => {

        if (isNaN(Number(n))) {
            throw new Error('One of the inputs was not a number');
        }

        return Number(n);
    });

    return {
        days: days,
        target: target,
    };
};

export const calculateExercises = (arr: Array<number>, target: number): Result => {
    const numberOfDaysTotal = arr.length;
    let numberOfDaysTrained = 0;
    let totalHours = 0;

    arr.forEach(day => {
        if (day !== 0) numberOfDaysTrained++;
        totalHours += day;
    });

    const average = totalHours / numberOfDaysTotal;
    const targetMet = average >= target ? true : false;
    let rating = 0;
    let ratingDescription = '';

    if (targetMet && numberOfDaysTotal === numberOfDaysTrained) {
        rating = 3;
        ratingDescription = 'Excellent job!';
    } else if (targetMet && numberOfDaysTotal > numberOfDaysTrained) {
        rating = 2;
        ratingDescription = 'Nice job!';
    } else if (!targetMet) {
        rating = 1;
        ratingDescription = 'Not too bad but could be better!';
    }

    const resultObject = {
        totalDays: numberOfDaysTotal,
        trainedDays: numberOfDaysTrained,
        totalHours: totalHours,
        average: average,
        originalTarget: target,
        success: targetMet,
        rating: rating,
        ratingDescription: ratingDescription,
    };

    return resultObject;
};

try {
    const { days, target } = parseArgs(process.argv);
    console.log(calculateExercises(days, target));
} catch (e) {
    console.log('Error:', e);
}