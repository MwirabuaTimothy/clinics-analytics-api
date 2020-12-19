import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Staff } from '../entities/Staff'

export default class StaffsSeeder implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Staff)
      .values([
        { 
          name: "Mercy Muyoka"
        },
        { 
          name: "Kennedy Ayako"
        },
        { 
          name: "Stephanie Tomsett"
        },
        { 
          name: "Faith Kityo"
        },
        { 
          name: "John Doe"
        },
        { 
          name: "Athman Doe"
        },
        { 
          name: "Sandra Doe"
        },
        { 
          name: "Daphne Doe"
        },
        { 
          name: "Eric Doe"
        },
        { 
          name: "Melissa Doe"
        }
      ])
      .execute()
  }
}