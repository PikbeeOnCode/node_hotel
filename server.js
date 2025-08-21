const express = require('express');
const app = express();
const db = require('./db');
const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes =require('./routes/menuItemRoutes')
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const passport = require('./auth');

const localAuthMiddleware = passport.authenticate('local',{session: false})

// Middleware
app.use(bodyParser.json());
const logRequest = (req,res,next) =>{
    console.log(` At : [${new Date().toLocaleDateString()}] request made to : ${req.originalUrl}`);
    next();  // move on to next phase 
}



app.use(logRequest);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to my hotel... How can I help you!!!');
});

// POST route

// creating post and get for menuitems



app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menu',localAuthMiddleware,menuItemsRoutes)



app.listen(PORT, () => {
    console.log('Port 3000 is listening!');
});
