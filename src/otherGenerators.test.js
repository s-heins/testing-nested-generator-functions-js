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
        assert.strictEqual(outcome, 6);
    });
});
