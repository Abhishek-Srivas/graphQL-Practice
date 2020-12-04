const express = require('express');
const {graphqlHTTP}  = require('express-graphql');
const graphqlSchema = require("./graphql/schema")
const graphqlResolver = require("./graphql/resolvers")
const mongoose = require("mongoose")

const app = express();


//Error handling Schema
app.use((err,req,res,next) => {
    res.status(err.status);
    res.send({
        err
    })
})



//Graphql Route
app.use('/graphql',graphqlHTTP({ // need two item to work 1.Schema 2.Rootvalue
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql:true
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

