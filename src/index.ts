import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema, Query, Resolver } from "type-graphql";
import { createConnection } from "typeorm";

@Resolver()
class TestResolver {
  @Query(()=> String)
  async helloWorld(){
    return "Hello World!";
  }
}

const main = async () => {
  
  const schema = await buildSchema({
    resolvers: [TestResolver]
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