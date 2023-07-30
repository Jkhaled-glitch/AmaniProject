const express = require('express')
const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.get('/', async(req,res)=>{
    try{
        users = await User.find()
        res.send(users)
    }
    catch{
        (err)=>{
            res.send(err)
        }
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
       geted = await User.findOne({ _id: id });
      res.send(geted);
    } catch (err) {
      res.send(err);
    }
  });

  router.post("/login", async(req,res)=>{
    try{
        data = req.body;
        user = await User.findOne({email: data.email})
        if(!user){
            res.status(404).send('invalid email or password')
        }else{
            validPass = bcrypt.compareSync(data.password, user.password);
            if(!validPass){
                res.status(401).send('invalid email or password')
            }
            else{
                payload = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    accountType: user.accountType
                }
                myToken = jwt.sign(payload,"1234")

                res.status(200).send({token : myToken
                    ,accountType: user.accountType}) 
            }
        }
    }catch(err){
        res.send(err)
    }
  })
  
  router.post("/register",async(req,res)=>{
    try{
        const data = req.body;
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
          return res.status(409).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const user = new User({
           
            userName :data.userName,
            email :data.email,
            password :hashedPassword,
            accountType: data.accountType,
          })

         await user.save()
        
        res.status(201).send(data)
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
})


router.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        deleted = await User.deleteOne({ _id: id });
       res.send(deleted);
     } catch (err) {
       res.send(err);
     }
})

router.put("/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        data = req.body;
        updatedUser = await  User.findByIdAndUpdate({ _id: id },data,{new: true})
        res.send(updatedUser);
     } catch (err) {
       res.send(err);
     }
})

module.exports= router