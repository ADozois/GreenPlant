class Properties{
    constructor(name, value){
        this.name = name;
        this.value = value;
    }

    getName(){
        return this.name;
    }

    value(newValue){
        this.value = newValue;
    }

    getValue(){
        return this.value;
    }
}