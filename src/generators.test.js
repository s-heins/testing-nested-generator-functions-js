import {generatorLevelOne} from "./generators";
import * as assert from "assert";
import {describe} from "mocha";

describe('generators', () => {
    let generator;

    beforeEach(() => {
        generator = generatorLevelOne(1);
    });


    it('calls the last function', async () => {
        assert.strictEqual(generator.next().value, 6);
    }) ;
});
