
class TimeoutManager{
    constructor(){
        this.list = [];
        this.interval = 300000; //5 minutes
        var t = this;
        this.garbageInterval = setInterval(function(){t.collectGarbage();}, this.interval) 
    }

    addTimeout(id, time, callback){
        let inList = this.elementInList(id);
        if(!inList){
            let timeout = setTimeout(callback, time);
            this.list.push({
                key: id,
                value: timeout
            });
        }
    }

    elementInList(id){
        let anwser = false;
        this.list.forEach(element => {
            if(element.key == id){
                anwser = true;
            }
        });
        return anwser;
    }

    deleteTimeout(id){
        let index = 0;
        let found = false;
        this.list.forEach(element => {
            if(element.key == id){
                clearTimeout(element.value);
                found = true;
            }
            if(!found){
                index++;
            }
        });     
        this.list.splice(index, 1);
    }

    collectGarbage(){
        let index = [];
        let i = 0;

        this.list.forEach(element => {
            console.log(element.value);
            console.log(element.value._called);
            if(element.value._destroyed || element.value._called){ // to verify if function called or cancelled
                index.push(i);
            }
            i++;
        });

        index.forEach(element => {
            this.list.splice(element, 1);
        });
    }

    Count(){
        return this.list.length;
    }

    set changeInterval(value){
        clearInterval(this.garbageInterval);
        this.interval = value;
        setInterval(this.collectGarbage, this.interval);
    }
}

module.exports = TimeoutManager