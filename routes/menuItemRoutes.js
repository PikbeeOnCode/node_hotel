const express =require('express');
const router = express.Router();
const menuItem = require('./../models/menuItem');



router.post("/",async (req,res)=>{
    try{
        const data = req.body;
        const newMenuItem = new  menuItem(data);
         const response = await newMenuItem.save(); 
        console.log('Data saved:', response);
        res.status(200).json(response);

    }catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/',async(req,res)=>{
    try{
        const data = await menuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error :' internal server error '})
    }
})

router.get('/:taste',async(req,res)=>{
    try{
        const tasteType = req.params.taste.toLocaleLowerCase();
        if(tasteType=="spicy"|| tasteType=="sweet"|| tasteType=="sour"){
            const response = await menuItem.find({taste:tasteType});
            console.log('data fetched of menu:');
             res.status(200).json(response);
        }else{
            res.status(404).json({error : 'invalid taste type' })
        }
    
        
    }catch(err){
        console.log(err);
        res.status(500).json({error :' internal server error '})
    }
})

//  creatiing data update operation 

router.put('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatedData = req.body;

        const response = await menuItem.findByIdAndUpdate(personId,updatedData,{
            new: true,
            runValidators:true,
        })

        if(!response){
            res.status(404).json({error:"menu not found "});
        }

        console.log('menu is updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error :' internal server error '})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const personId = req.params.id;

        response = await menuItem.findByIdAndDelete(personId);
        if(!response){
          return  res.status(404).json({error:"menu is not found"});
        }

        console.log('menu is removed');
        res.status(200).json(response);
    }catch(err){
           console.log(err);
        res.status(500).json({error :' internal server error '})
    }
})

module.exports = router;