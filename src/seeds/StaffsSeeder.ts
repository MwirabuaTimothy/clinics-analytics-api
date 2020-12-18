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
          name: "Tim Truston"
        },
        { 
          name: "Athman Gude"
        },
        { 
          name: "Sandra Mamai"
        },
        { 
          name: "Daphne Ngunjiri"
        },
        { 
          name: "Eric Mbuthia"
        },
        { 
          name: "Melissa Menke"
        }
      ])
      .execute()
  }
}