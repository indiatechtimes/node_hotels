const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

// define the person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        required:true,

    },
    work:{
        type:String,
        enum:["chef","waiter","manager"],
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,

    },
    salary:{
        type:Number,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})

// this is the schema of person





personSchema.pre("save",async function(next) {

    const person=this;
    // hash the password only if it has been modified( or is new )
    if(!person.isModified("password")) return next();

    try {

        // hash password generation 
        const salt=await bcrypt.genSalt(10);

        // hash password 
        const hashedPassword=await bcrypt.hash(person.password,salt);

        // override the plain password withe the hashed one
        person.password=hashedPassword;



        
        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword=async function(candidatePassword) {
    try {
        // use bcrypt to compare the provided password with the hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch'
    } catch (error) {
        throw error;
    }
}

//now 
const Person=mongoose.model("Person",personSchema);
module.exports=Person;