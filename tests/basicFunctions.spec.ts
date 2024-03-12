import 'mocha';
import {expect} from 'chai';
import {add} from "../src/basicFunctions.js";
/**
 * Test for basicFunctions.js
 */
describe("add function tests", () => {
  it("add(1, 8) returns value 9", () => {
    expect(add(1, 8)).to.be.equal(9);
  });

});
