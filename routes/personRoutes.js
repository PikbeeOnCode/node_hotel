const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const { rawListeners } = require('../models/menuItem');


router.post('/', async (req, res) => {
    try {
        const data = req.body; // request body
        const newPerson = new Person(data); // create mongoose document
        const response = await newPerson.save(); // save to DB

        console.log('Data saved:', response);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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
        const workType = req.params.worktype.toLocaleLowerCase(); //extract the work type from the parameters 
        if(workType=="chef"|| workType == "manager"|| workType == "waiter"){
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