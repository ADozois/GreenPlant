var Device = require('../device');
const Status = require('../status');
var expect = require('chai').expect;
const sinon = require('sinon');


const oneSec = 1000;

var testFunction = function (){
    console.log('The function was executed');
}

describe("Test Register class", function(){

    beforeEach(function () {
        this.sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        this.sandbox.restore()
    });
  
})



