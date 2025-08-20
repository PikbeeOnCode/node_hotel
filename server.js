//  normal function 

// function add(a,b) {
//     return a+b
// }

// console.log('the added value of ',add(10,10));


// the arrow function 

// const add = (a,b)=>{
//     return a+b 
// }

// console.log('the added value using arrow func :',add(10,10));

//  the callback function 

// function greet(name, callback) {
//   console.log("Hello " + name);
//   callback(); // Call the function passed as argument
// }

// function afterGreet() {
//   console.log("Welcome to the platform!");
// }

// // Pass 'afterGreet' as a callback
// greet("Krish", afterGreet);


// using fs and os (modules );

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);

// fs.appendFile('greeting.txt','Hi' + user.username + '\n',()=>{console.log('file is created ');
// })

// var ns = require('./notes.js');
// var _ = require('lodash');

// const arr = ['name','age ','hello',2,3,4,5,'name',2,3,4,'hello']

// console.log(ns.age);

// let result = ns.add(20,20);
// console.log(result)

// var filter = _.uniq(arr);
// console.log(filter);

// var platform = os.platform();
// console.log(platform)

// var arch = os.arch();
// console.log(arch);

// var totalmem = os.totalmem();
// console.log(totalmem);

// var freemem = os.freemem();
// console.log(freemem);

// var uptime = os.uptime();
// console.log(uptime);

// var cpus = os.cpus();
// console.log(cpus)


//  using express server 

const express = require('express');
const app = express();
const db = require('./db');
const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes =require('./routes/menuItemRoutes')
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const passport = require('passport')
const localStrategy = require('passport-local');
const Person = require('./models/person');
const localAuthMiddleware = passport.authenticate('local',{session: false})

// Middleware
app.use(bodyParser.json());
const logRequest = (req,res,next) =>{
    console.log(` At : [${new Date().toLocaleDateString()}] request made to : ${req.originalUrl}`);
    next();  // move on to next phase 
}

passport.use( new localStrategy(
    async (username,password,done)=>{
    //  authentication logic here 
    try {
        console.log('recived credentials :',username,password);
        const user = await Person.findOne({username,password});
        if(!user){
            return done(null,false,{message: "incorrect username"});
        }

        const isPasswordmatch = user.password == password ? true : false ;
        if(isPasswordmatch){
            return done(null,user);
        }else{
            return done(null,false,{message: " incorrect password "});      
        }
        
    } catch (error) {
        return done(error);
    }
}))

app.use(logRequest);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to my hotel... How can I help you!!!');
});

// POST route

// creating post and get for menuitems



app.use('/person',personRoutes);
app.use('/menu',menuItemsRoutes)



app.listen(PORT, () => {
    console.log('Port 3000 is listening!');
});
