const mongoos=require('mongoose');
//create user shema
const userSchema=mongoos.Schema(
    {
        firstName:String,
        lastName:String,
        email:String,  
        password:String,
        tel:String,
        avatar:String,
        role:String,
    }
);

 //affect model name(user) to shema
 const user= mongoos.model("User",userSchema);
 //make import 
 module.exports=user;