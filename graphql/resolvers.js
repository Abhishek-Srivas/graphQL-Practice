const User = require('../Models/user');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


module.exports = { 
    hello () {
        return {
            text:"hello world",
            views:1234
        };
    },

    createUser: async function({userInput}, req) {
        const email = userInput.email;
        const password = userInput.password;
        const existingUser = await User.findOne({email:email})
        const errors = [];
        //Email validation
        if(!validator.isEmail(email)){ 
            errors.push({message:'E-mail is invalid.'})
        }
        //password validation
        if(validator.isEmpty(password) || !validator.isLength(password,{min:5,max:50})){
            errors.push({message:"password too short"})
        }



        if(errors.length > 0){
            const error = new Error('Invalid Input');
            error.data = errors;
            error.code = 422;
            throw error;

        }

        if(existingUser){
            const error = new Error('User Already Exist');
            throw error;
        }

        const hashedPw = await bcrypt.hash(password,12);
        const user = new User({
            email:email,
            password:hashedPw,
            name:userInput.name
        })

        const createdUser = await user.save();
        return {...createdUser._doc, _id:createdUser._id.toString()};

    },

    login: async function({email,password}) {
        const user = await User.findOne({email:email});

        if(!user){
            const error = new Error('User not exist');
            error.code = 401;
            throw error;
        }

        const isPasswordEqual = await bcrypt.compare(password,user.password);

        if(!isPasswordEqual){
            const error = new Error('Password is Incorrect');
            error.code = 401;
            throw error;
        }

        const token = jwt.sign({
            userId:user._id.toString(),
            email:email
        },'herePutTheSecretKey',{expiresIn:'1h'});
        
        return {token:token,userId:user._id.toString()};
    }
}