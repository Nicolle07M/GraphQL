
import {ApolloServer, gql} from 'apollo-server';

const persons = [
    { 
        id: 1, 
        name: 'Juan',
        age: 25 ,
        city: "Barcelona",
        phone: "3202102110"
    },
    { 
        id: 2, 
        name: 'Ana',
        age: 30 ,
        city: "Madrid",
        phone: "3112548745"
    },
    { 
        id: 3, 
        name: 'Andrew',
        age: 18 ,
        city: "Ibiza"
    },

]


// DEFINICIONES
const typeDefs = gql`
    type Person {
        name: String!
        age: Int!
        city: String!
        phone: String
        id: Int!
    }
    type Query {
        personCount: Int!
        allPersons: [Person]!
    }
`

// COMO RESOLVERLO
const resolvers = {
    Query: {
         personCount: () => persons.length,
         allPersons: () => persons
    }
}

// CREAR EL SERVIDOR
const server = new ApolloServer({
    typeDefs,
    resolvers
})

//INICIAR EL SERVIDOR
server.listen().then(({url}) => {
    console.log(`Servidor iniciado en ${url}`)
})