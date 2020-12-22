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
          name: "Wrong Prescription",
          location: "Kosovo"
        },
        { 
          name: "Opened Late",
          location: "Kiambiu"
        },
        { 
          name: "Bad Receipts",
          location: "New York"
        },
        { 
          name: "Late Check In",
          location: "Mathare"
        },
        { 
          name: "Delay in Lab",
          location: "Kiambiu"
        },
        { 
          name: "Careless Waste Disposal",
          location: "Kiambiu"
        }
      ])
      .execute()
  }
}