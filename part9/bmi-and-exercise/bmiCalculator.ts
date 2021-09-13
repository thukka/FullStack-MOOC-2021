const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) * (height / 100))

    if (bmi < 19) {
        return 'Underweight (bmi is less than 19)'
    } else if (bmi < 24.9) {
        return 'Normal weight (bmi between 19 and 24.9)'
    } else if (bmi > 24.9) {
        return 'Overweight (bmi over 24.9)'
    } else {
        throw new Error('Something went wrong!')
    }
}

console.log(calculateBmi(186, 104))