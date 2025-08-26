const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const  {jwtAuthmiddleware,generatetoken} = require('./../jwt')


router.post('/signup', async (req, res) => {
    try {
        const data = req.body; // request body
        const newPerson = new Person(data); // create mongoose document
        const response = await newPerson.save(); // save to DB

        const payload = {
            id:response.id,
            username:response.userName,
        }
        console.log(payload);
        
        const token = generatetoken(payload);


        console.log('token;',token)
        console.log('Data saved:', response);
        console.log('data recieved',data);
        res.status(200).json({response:response,token:token});
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// creating a login
router.post('/login', async (req,res)=>{
    try{
        const { userName, password } = req.body;

        // find the user by username
        const user = await Person.findOne({ userName: userName });

        // if user doesn't exist or password doesn't match
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // payload for token
        const payload = {
            id: user.id,
            username: user.userName
        };

        // generate token
        const token = generatetoken(payload);

        // send response
        return res.status(200).json({ 
            message: "Login successful", 
            token: token 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/profile',async(req,res)=>{
    try {
        const userdata = req.user;
        console.log("user data:",userdata);

        const userId = userdata.id;
        const user = await Person.findById(userId)
        res.status(200).json(user);
    } catch (error) {
         console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})


router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error :' internal server error '})
    }
})

router.get('/:worktype',async (req,res)=>{
    try{
        const workType = req.params.worktype; //extract the work type from the parameters 
        if(workType=="chef"|| workType == "manager"|| workType == "worker"){
            const response = await Person.find({work:workType});
            console.log('data fetched about work');
            res.status(200).json(response)
        }else{
            res.status(404).json({error : 'invalid work type' })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error :' internal server error '})
    }
})

router.put('/:id', async(req,res)=>{
    try{
           const personid = req.params.id;
             const updatedPersonData = req.body;

             const response = await Person.findByIdAndUpdate(personid,updatedPersonData,{
                new:true,
                runValidators:true,
             })

             if(!response){
                return res.status(404).json({error:'person not found '})
             }

             console.log('data is updated');
             res.status(200).json(response);

    }catch(err){
            console.log(err);
            res.status(500).json({error :' internal server error '})
    }
    }
)

//  creating delete option 

router.delete('/:id',async(req,res)=>{
    try{
         const personid =req.params.id;
         const deletedData = req.body;

    const response = await Person.findByIdAndDelete(personid);
        if(!response){
            res.status(404).json({error:" person is not found "});
        }
        console.log('data is removed');
        res.status(200).json(response)
    }catch(err){
         console.log(err);
            res.status(500).json({error :' internal server error '})
    }
   

})

module.exports = router;