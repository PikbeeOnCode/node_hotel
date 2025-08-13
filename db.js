const mongoose = require('mongoose');
require('dotenv').config();


//  define the mongoDb connection 
// const mongoURL = 'process.env.DB_URL_LOCAL; local data base 
const DB_URL = process.env.DB_URL;

// setup  mongodb connection
mongoose.connect(DB_URL,{
    useNewUrlParser :true,
    useUnifiedTopology: true
});

// get the default connection 
//  mongoose maintains a default  connection onjects represtening the mongoDb connection 
const db = mongoose.connection;

//  define event listners for database connection 

db.on('connected',()=>{
    console.log('connected to mongoDB server')
});

db.on('error',(err)=>{
    console.log('mongoDb connection error :',err);
})

db.on('disconnected',()=>{
    console.log('disconnected to mongoDB server ');
    
})

// export the db connection 

module.exports = db ;