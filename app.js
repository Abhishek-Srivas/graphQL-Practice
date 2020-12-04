const express = require('express');
const {graphqlHTTP}  = require('express-graphql');
const graphqlSchema = require("./graphql/schema")
const graphqlResolver = require("./graphql/resolvers")
const mongoose = require("mongoose")

const app = express();

//Graphql Route
app.use('/graphql',graphqlHTTP({ // need two item to work 1.Schema 2.Rootvalue
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql:true,
    customFormatErrorFn(err) {
        if(!err.originalError) {
            return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'an error occured';
        const code = err.originalError.code || 500;
        return {message,data,status:code}

    }
}));

mongoose.connect("mongodb+srv://Abhishek_Srivas:Pagalworld@cluster0.0sntl.mongodb.net/Database?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(res =>{
    app.listen(3000, () => {
        console.log("server running")
    })
}).catch(err =>{
    res.send(err)
})

