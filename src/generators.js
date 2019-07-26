export function* generatorLevelThree(i) {
    return yield i + 3;
}

export function* generatorLevelTwo(i) {
    return yield* generatorLevelThree(i+2)
}

export function* generatorLevelOne(i) {
    return yield* generatorLevelTwo(i);
}

console.log(generatorLevelOne(1));
console.log(generatorLevelOne(1).next().value);
