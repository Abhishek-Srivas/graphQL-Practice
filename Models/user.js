const { ObjectID } = require('mongodb')
const mongoose = require('mongoose')

const User = new mongoose.Schema({
    
        name: String,
        email: String,
        password: String,
        status:String,
        posts:[{
            title: String,
            content: String,
            imageUrl: String,
            creator: ObjectID,
            createdAt: String,
            updatedAt: String
        }]
})

module.exports = mongoose.model("graphqlUsers",User)