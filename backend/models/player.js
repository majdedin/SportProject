//import mongoos module
const mongoos=require('mongoose');
    //create player shema
    const playerSchema=mongoos.Schema(
        {
            name:String,
            position:String,
            number:Number,
            age:Number
        }
    );
    //affect model name to shema
    const player= mongoos.model("Player",playerSchema);
    //make import 
    module.exports=player;
