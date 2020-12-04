const User = require('../Models/user');
const validator = require('validator');


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
            const error = new Error;
            throw error;
        }

        const user = new User({
            email:email,
            password:password,
            name:userInput.name
        })

        const createdUser = await user.save();
        return {...createdUser._doc, _id:createdUser._id.toString()};

    }
}