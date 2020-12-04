const User = require('../Models/user');


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