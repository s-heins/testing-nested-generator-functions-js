# Testing nested generator functions in JavaScript

- [Testing nested generator functions in JavaScript](#testing-nested-generator-functions-in-javascript)
  - [Introduction to generator functions](#introduction-to-generator-functions)
  - [Nested generator functions](#nested-generator-functions)

Rough draft

- introduction to generator functions
  - when are we using nested generator functions?
  - generators in plain js vs redux (-saga)
    - is there this distinction `yield` vs `yield*` / parallel vs sequential execution in plain js?
    - = is there an implication if we use `yield*` instead of `yield` in plain js, apart from testability?
  - introduction to redux(-saga)
    - usage
      - redux
        - state management in React apps
      - saga
        - middleware for redux
          - responds to actions and can throw other actions
          - those may be used by another saga or a redux reducer
          - the reducer then returns the new state
        - sagas are generator functions
    - difference between calling generators with `yield` or `yield*`
      - `yield`: parallel execution
      - `yield*`: sequential execution
- how to test generator functions
  - just one
  - nested generator functions
    - with `yield`
    - with `yield*`

## Introduction to generator functions

Generator functions are an ES6 (ES2015) feature.
They are functions that can run asynchronously and return an iterator, or more specifically, a [generator object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).

The syntax looks like this:

```js
function* myGenerator() {
  yield 4;
  yield 5;
}
```

It is possible to execute generator functions step-by-step because they return an iterator:

When calling the iterator's `next()` method, the generator is executed until the first yield.
Each call to `next` returns an object with a `value` which contains the output of the yield call and a `done` attribute.
We can then run some other code and resume execution later on by calling `iterator.next()` again.
After the last yield call, the generator will have finished.
In its return object, `value` will be `undefined` and `done` will be `true`.

```js
const myIterator = myGenerator();

console.log(myIterator.next()); // { value: 4, done: false }
console.log(myIterator.next()); // { value: 5, done: false }
console.log(myIterator.next()); // { value: undefined, done: true }
```

Thus, a generator can return a series of values, one for each `yield` call instead of just returning one value like a normal function.

To read more about generator functions, please have a look at the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

## Nested generator functions

Within a generator function, we use `yield` to return a value or `yield*` to delegate execution to another generator function.
This article will focus on how to test the latter.

Please have a look at the MDN documentation if you want to read more about the [yield](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield) or [yield*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*) expressions.

Side note:
One possible application of nested generator functions is within Redux Saga for React applications.
Redux takes care of state management in React apps.
A so-called reducer reacts to an action and returns a modified state object.
This can be useful when we want child components to communicate with each other where the traditional way of passing state as props from the parent to the child component is no longer sufficient.
Redux Saga now acts as middleware before the reducer: It consumes an action and produces another one which can be consumed by another saga or a reducer.
When a saga is called within another saga, we have nested generator functions within our application.

<!-- For Redux Saga: While `yield` executes functions in parallel, `yield*` calls each sequentially. -->

Let's look at nested generator functions in plain javascript:

```js
export function* generatorLevelThree(i : number) {
    return yield i + 3;
}

export function* generatorLevelTwo(i: number) {
    return yield* generatorLevelThree(i + 2)
}

export function* generatorLevelOne(i: number) {
    return yield* generatorLevelTwo(i);
}
```

Since `yield*` passes control to the next generator function, we can access the output of `generatorLevelOne` straight with `generator.next().value` in our tests:

```js
import {generatorLevelOne} from "./generators";
import * as assert from "assert";

describe('generators', () => {
    let generator : Generator;

    beforeEach(() => {
        generator = generatorLevelOne(1);
    });


    it('calls the last function', async () => {
        assert.strictEqual(generator.next().value, 6);
    }) ;
});
```

If we use `yield` instead, we can test each step by itself.

```js
export function* otherGeneratorLevelThree(i : number) {
    return yield i + 3;
}

export function* otherGeneratorLevelTwo(i: number) {
    return yield otherGeneratorLevelThree(i + 2)
}

export function* otherGeneratorLevelOne(i: number) {
    return yield otherGeneratorLevelTwo(i);
}
```

In the tests, we can see that the first two generators return the next generator object in its `value`. The third generator then returns `6` as the outcome of `yield i + 3`.

```js
import * as assert from "assert";
import {otherGeneratorLevelOne} from "./otherGenerators";
import {describe} from "mocha";

describe('generators', () => {
    let generator;

    beforeEach(() => {
        generator = otherGeneratorLevelOne(1);
    });


    it('calls the last function', async () => {
        const genTwo = generator.next().value;
        const genThree = genTwo.next().value;
        const outcome = genThree.next().value;
        assert.strictEqual(outcome.value, 6);
    });
});

```
