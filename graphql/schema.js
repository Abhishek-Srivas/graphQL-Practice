const { buildSchema } = require('graphql');
 
module.exports = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TestData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }

    input UserInputData {
        email: String!
        name:String!
        password:String! 
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status:String!
        posts: [Post!]!
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    schema {
        query: RootQuery          
        mutation: RootMutation
    }

    
`);
/*
    query ( object with all the queries(is the part where you get data) ) , all the queries you want to allow are written here 
    hello: there is a query which will return a string by adding ! now this field is required

    We need a method for every query or mutation that are defined in resolver.js
*/ 