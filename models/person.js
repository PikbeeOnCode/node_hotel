const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//  define person schema 

const personSchema = new mongoose.Schema(
    {
        name:{
            type : String ,
            required : true
        },
        age:{
            type : Number
        },
        work:{
            type :String ,
            enum : ['worker','chef','manager'],
            required : true
        },
        mobile:{
            type : String,
            required : true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        address:{
            type:String
        },
        salary:{
            type:Number,
            required:true
        },
        userName:{
            required : true,
            type: String
        },
        password :{
            required : true,
            type :String
        }
    }
)

personSchema.pre('save', async function(next){
    const person = this;
    // hash the password only if it has been modified(or is new);
    if(!person.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        
        // hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);

        // override the password with the hashed password 

        person.password = hashedPassword ;

        next();
    }catch(err){
        return next(err);
    }
})

    personSchema.methods.comparePassword = async function (candidatePassword) {
        try {
            // use bcrypt to comapre the provided password with the hashed password 
            const isMatch = await bcrypt.compare(candidatePassword,this.password);
            return isMatch;
        } catch (error) {
            
        }
    }



//  create person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;