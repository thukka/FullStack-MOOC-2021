interface Result {
    totalDays: number,
    trainedDays: number,
    totalHours: number,
    average: number,
    originalTarget: number,
    success: boolean,
    rating: number,
    ratingDescription: string
};

const calculateExercises = (arr: Array<number>, target: number): Result => {
    const numberOfDaysTotal = arr.length;
    let numberOfDaysTrained = 0;
    let totalHours = 0;

    arr.forEach(day => {
        if (day !== 0) numberOfDaysTrained++;
        totalHours += day;
    });

    let average = totalHours / numberOfDaysTotal;
    let targetMet = average >= target ? true : false;
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

console.log(calculateExercises([3, 0, 2, 4.5, 1, 3, 1], 2));