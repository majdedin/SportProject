const mongoos=require('mongoose');
    //create player shema
    const teamSchema=mongoos.Schema(
        {
            name:String,
            owner:String,
            foundation:Number,
        }
    );
    //affect model name to shema
    const team= mongoos.model("Team",teamSchema);
    //make import 
    module.exports=team;
