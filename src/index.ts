import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { ClinicsResolver } from "./classes/Clinic";
import { IssuesResolver } from "./classes/Issue";
import { VisitsResolver } from "./classes/Visit";
import { StaffsResolver } from "./classes/Staff";

const main = async () => {
  
  await createConnection().then(({options}) => {
    console.log(`Connected to ORM database ${options.database}`);
  })

  const schema = await buildSchema({
    resolvers: [ClinicsResolver, IssuesResolver, VisitsResolver, StaffsResolver]
  });

  const apolloServer = new ApolloServer({schema})

  apolloServer.listen(5000).then(({url}) => {
    console.log(`Started server on port ${url}`);
  })

}

main()