const mongoose = require('mongoose');
const { type } = require('os');

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

//  create person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;