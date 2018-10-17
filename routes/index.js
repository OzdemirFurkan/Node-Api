const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


router.post('/register', (req, res, next) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
            username,
            password: hash
        });

        const promise = user.save();
        promise.then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err);
        })
    });
});


router.post('/auth', (req, res) => {
    const { username, password } = req.body;

    User.findOne({
        username
    },(err, user) => {
        if(err) {throw err;}
        if(!user){
            res.json({
                status:false,
                message:'USER NOT FOUND'
            });
        }else{
            bcrypt.compare(password, user.password).then((result) => {
                if(!result){
                    res.json({
                        status:false,
                        message:'WRONG PASSWORD OR USERNAME'
                    });
                }else{
                    const payload = {
                      username
                    };
                    const token = jwt.sign(payload, req.app.get('api_secret_key'),
                        {
                            expiresIn: 720 //12 Hours
                        });
                    res.json({
                        status:true,
                        token
                    })

                }
            })
        }
    })
});



module.exports = router;
