const shuffle = (array) => {
    let currentIndex: number = array.length;
    let randomIndex: number;
    let temporaryValue: any;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

const ArraysService = {
    shuffle
};

export default ArraysService;
