var TimeoutManager = require('../timeoutManager');
var expect = require('chai').expect;
const sinon = require('sinon');


const oneSec = 1000;

var testFunction = function (){
    console.log('The function was executed');
}

describe("Test TimeoutManager class", function(){

    beforeEach(function () {
        this.sandbox = sinon.createSandbox();
        this.list = [];
        this.clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        this.sandbox.restore()
        this.list.forEach(element => {
            clearInterval(element.garbageInterval);
        });
        this.clock.restore();
    });
      
    it("Testing adding a timeout", function(done){
        var manager = new TimeoutManager();
        var callback = sinon.spy();

        this.list.push(manager);
        manager.addTimeout("Test ID", 5000, callback);

        expect(manager.Count()).to.equal(1);
        done();
    })
    it("Testing removing timeout", function(done){
        var manager = new TimeoutManager();
        var manager2 = new TimeoutManager();
        var callback = sinon.spy();

        this.list.push(manager);
        this.list.push(manager2);
        manager.addTimeout("Test1", 50000, callback);
        manager2.addTimeout("Test2", 50000, callback);
        manager2.addTimeout("Test3", 50000, callback);
        this.clock.tick(1000);
        manager.deleteTimeout('Test1');
        manager2.deleteTimeout('Test2');

        expect(manager.Count()).to.equal(0);
        expect(manager2.Count()).to.equal(1);
        done();
    })
    it("Checking object in array", function(done){
        var manager = new TimeoutManager();
        var callback = sinon.spy();

        this.list.push(manager);
        manager.addTimeout("Test1", 50000, callback);
        manager.addTimeout("Test2", 50000, callback);
        manager.addTimeout("Test3", 50000, callback);
        this.clock.tick(1000);

        expect(manager.elementInList("Test2")).to.be.true;
        expect(manager.elementInList("Test4")).to.be.false;
        done();
    })
    it("Checking callback is call", function(done){
        var manager = new TimeoutManager();
        var callback = sinon.spy();

        this.list.push(manager);
        manager.addTimeout("Test1", 3000, callback);
        this.clock.tick(1000);

        expect(callback.called).to.be.false;

        this.clock.tick(1000);

        expect(callback.called).to.be.false;

        this.clock.tick(1000);

        expect(callback.called).to.be.true;
        done();
    })
})



