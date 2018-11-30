var Device = require('../device');
const Status = require('../status');
var expect = require('chai').expect;
const sinon = require('sinon');


const oneSec = 1000;

var testFunction = function (){
    console.log('The function was executed');
}

describe("Test Device class", function(){

    beforeEach(function () {
        this.sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        this.sandbox.restore()
    });
      
    it("Testing class creation", function(){
        var device = new Device("123", "Test", "192.0.0.135");

        expect(device.DeviceId).to.be.equal("123");
        expect(device.Name).to.be.equal("Test");
        expect(device.Ip).to.be.equal("192.0.0.135");
        expect(device.Status).to.be.equal(Status.CONNECTED);
    })
    
    it("Testing disconnect method", function(){
        var device = new Device("123", "Test", "192.0.0.135");

        expect(device.Status).to.be.equal(Status.CONNECTED);
        device.disconnect();
        expect(device.Status).to.be.equal(Status.DISCONNECTED);
    })

    it("Testing connect method", function(){
        var device = new Device("123", "Test", "192.0.0.135");

        expect(device.Status).to.be.equal(Status.CONNECTED);
        device.disconnect();
        expect(device.Status).to.be.equal(Status.DISCONNECTED);

        device.connect();
        expect(device.Status).to.be.equal(Status.CONNECTED);
    })

    it("Testing desired update method", function(){
        var device = new Device("123", "Test", "192.0.0.135");

        device.updateDesired("Property_1", 23);
        device.updateDesired("Property_2", 35.6);
        device.updateDesired("Property_3", "value");
        device.updateDesired("Property_4", {"test": 1, "test2": "2"});

        expect(device.Desired.Property_1).to.be.equal(23);
        expect(device.Desired.Property_2).to.be.equal(35.6);
        expect(device.Desired.Property_3).to.be.equal("value");
        expect(JSON.stringify(device.Desired.Property_4)).to.be.equal(JSON.stringify({"test": 1, "test2": "2"}));
        expect(JSON.stringify(device.Desired)).to.be.equal(JSON.stringify({"Property_1": 23, "Property_2": 35.6, "Property_3": "value", "Property_4": {"test": 1, "test2": "2"}}));        

    })

    it("Testing reported update method", function(){
        var device = new Device("123", "Test", "192.0.0.135");

        device.updateReported("Property_1", 23);
        device.updateReported("Property_2", 35.6);
        device.updateReported("Property_3", "value");
        device.updateReported("Property_4", {"test": 1, "test2": "2"});

        expect(device.Reported.Property_1).to.be.equal(23);
        expect(device.Reported.Property_2).to.be.equal(35.6);
        expect(device.Reported.Property_3).to.be.equal("value");
        expect(JSON.stringify(device.Reported.Property_4)).to.be.equal(JSON.stringify({"test": 1, "test2": "2"}));
        expect(JSON.stringify(device.Reported)).to.be.equal(JSON.stringify({"Property_1": 23, "Property_2": 35.6, "Property_3": "value", "Property_4": {"test": 1, "test2": "2"}}));        

    })
})



