import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { ClinicsResolver } from "./entities/Clinics";

const main = async () => {
  
  const schema = await buildSchema({
    resolvers: [ClinicsResolver]
  });

  const apolloServer = new ApolloServer({schema})

  await createConnection().then(() => {
    console.log('Connected to ORM')
  })

  apolloServer.listen(5000).then(({url}) => {
    console.log(`Started server on port ${url}`);
  })

}

main()