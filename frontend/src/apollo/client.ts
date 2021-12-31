import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const uri = process.env.NODE_ENV === "development" ? "http://localhost:4000/graphql" : "https://crypto-tool-bitcoin.herokuapp.com/graphql";
// Initialize the apollo client.
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri
    })
});

export default client;