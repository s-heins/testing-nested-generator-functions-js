import * as assert from "assert";
import {otherGeneratorLevelOne} from "./otherGenerators";
import * as util from "util";
import {describe} from "mocha";

describe('generators', () => {
    let generator

    beforeEach(() => {
        generator = otherGeneratorLevelOne(1);
    });


    it('calls the last function', async () => {
        console.log(util.inspect(generator), 'gen');
        const genTwo = generator.next();
        console.log(genTwo.value, genTwo.done, 'gen 2');
        const genThree = genTwo.value.next();
        console.log(genThree.value, genThree.done, 'gen 3');
        const outcome = genThree.value.next();
        console.log(outcome.value, outcome.done, 'outcome');
        const outcome3 = genThree.value.next();
        console.log(outcome3.value, outcome3.done, 'outcome3');
        const outcome2 = genTwo.value.next();
        console.log(outcome2.value, outcome2.done, 'outcome2');
        const outcome1 = generator.next();
        console.log(outcome1.value, outcome1.done, 'outcome1');
        assert.strictEqual(outcome.value, 6);
    });
});
