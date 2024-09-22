
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

    type Address {
        city: String!
        check: String!

    }
    type Person {
        name: String!
        age: Int!
        phone: String
        address: Address!
        id: Int!
        check: String!
    }
    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
`

// COMO RESOLVERLO
const resolvers = {
    Query: {
         personCount: () => persons.length,
         allPersons: () => persons,
         findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
         }
    },
    Person: {
        address: (root) => {
            return {
                city: root.city,
                check: root.check
            }
        },
        check: () => "123"
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