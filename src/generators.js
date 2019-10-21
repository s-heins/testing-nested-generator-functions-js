export function* generatorLevelThree(i) {
    yield i + 3;
}

export function* generatorLevelTwo(i) {
    yield* generatorLevelThree(i + 2);
}

export function* generatorLevelOne(i) {
    yield* generatorLevelTwo(i);
}

console.log(generatorLevelOne(1));
console.log(generatorLevelOne(1).next().value);
