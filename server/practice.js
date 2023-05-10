var removeDuplicates = function (numbs) {
    let i = 0;
    for (let j = 0; j < numbs.length; j++) {
        if (numbs[j] != numbs[i]) numbs[++i] = numbs[j];
    }
    return ++i;
};

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
