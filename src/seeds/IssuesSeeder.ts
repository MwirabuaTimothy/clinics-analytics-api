import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Issue } from '../entities/Issue'

export default class IssuesSeeder implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Issue)
      .values([
        { 
          name: "Wrong Prescription"
        },
        { 
          name: "Opened Late"
        },
        { 
          name: "Bad Receipts"
        },
        { 
          name: "Late Check In"
        },
        { 
          name: "Delay in Lab"
        },
        { 
          name: "Careless Waste Disposal"
        }
      ])
      .execute()
  }
}