export function* otherGeneratorLevelThree(i) {
    yield i + 3;
}

export function* otherGeneratorLevelTwo(i) {
    yield otherGeneratorLevelThree(i + 2)
}

export function* otherGeneratorLevelOne(i) {
    yield otherGeneratorLevelTwo(i);
}

console.log(otherGeneratorLevelOne(1));
console.log(otherGeneratorLevelOne(1).next().value);
