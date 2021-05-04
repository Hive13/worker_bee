
// Third party modules

// Our modules

// Test Modules
import { expect } from 'chai';
import 'mocha';
import Done = Mocha.Done;

describe('Basic tests', () => {
   it('Just say hi.', (done: Done) => {
        const bob = "Hi.";
        expect(bob).to.equal('Hi.');
        done();
   });
});
