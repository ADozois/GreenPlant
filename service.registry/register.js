var Device = require('./device');
var TimeoutManager = require('./timeoutManager');
var mqtt = require('mqtt');
var redis = require('redis');
const ip = require('ip')

var connectionId = "{\"deviceId\": \"test" + String(Math.floor(Math.random()*Math.floor(100))) + "\", \"name\": \"name\", \"IpAddress\":\"" + ip.address() + "\"}";
const oneHour = 3600000;

class Registry{
    constructor(){
        this.list = [];
        this.count = 0;
        this.manager = new TimeoutManager();
        this.redisClient = redis.createClient();
        this.redisClient.on("error", (err) => {
            console.log("Error: " + err);
        });
        this.redisClient.on("connect",() => {
            console.log("Connected");
        });
        
    }

    setup(){
        this.mqttClient = mqtt.connect("mqtt://localhost", {clientId: connectionId});
        this.mqttClient.subscribe("/devices/#", (err) => {
            if(err){
                console.log("Error: " + err.toString());
            }
        });
        this.mqttClient.on("message", (topic, message) => {
            var device = this.createDeviceFromMessage(message);
            if(topic == "/devices/connected"){
                this.registerDevice(device);
            }
            if(topic == "/devices/disconnected"){
                this.manager.addTimeout(device.deviceId, oneHour, this.deleteDevice(device.deviceId));
            }
        })
    }

    registerDevice(device){
        let id = this.list.find(device.deviceId);
        if(id == undefined){
            this.list.push(device.deviceId);  
            this.count += 1;
            this.redisClient.set(device.deviceId, JSON.stringify(device))
        }
    }

    deleteDevice(deviceId){
        let index = this.list.findIndex(deviceId);
        if(index != -1){
            this.redisClient.del(deviceId);
            this.list.splice(index,1);
        }
    }

    parseMessage(topic, message){
        var device = this.createDeviceFromMessage(message);
        if(topic == "/devices/connected"){
            this.redisClient.set(device.deviceId, JSON.stringify(device), redis.print);
        }
        if(topic == "/devices/disconnected"){
            this.redisClient.del(device);
        }
    }

    createDeviceFromMessage(message){
        var objectProtoype = JSON.parse(message);
        var object = new Device(objectProtoype.deviceId, objectProtoype.name, objectProtoype.ipAdresse);
        return object;
    }
    
}

module.exports = Registry