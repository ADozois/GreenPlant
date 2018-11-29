const Device = require('./Device')
const Direction = require('./direction')

class SchemaDevice extends Device{
    constructor(deviceId, name, schema){
        super(deviceId, name)
        this.schema = schema;
    }
    
    updateProperty(property, value, direction){
        for (var prop in this.schema){
            if(property == prop){
                if (direction == Direction.DESIRED) {
                    this.updateDesired(property, value)
                }
                if(direction == Direction.REPORTED) {
                    this.updateReported(property, value)
                }
            }
        }
    }
}