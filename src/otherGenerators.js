export function* otherGeneratorLevelThree(i) {
    return yield i + 3;
}

export function* otherGeneratorLevelTwo(i) {
    return yield otherGeneratorLevelThree(i + 2)
}

export function* otherGeneratorLevelOne(i) {
    return yield otherGeneratorLevelTwo(i);
}

console.log(otherGeneratorLevelOne(1));
console.log(otherGeneratorLevelOne(1).next().value);
