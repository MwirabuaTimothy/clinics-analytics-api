import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Clinic } from '../entities/Clinic'

export default class ClinicsSeeder implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Clinic)
      .values([
        { 
          name: "Kiambiu",
          location: 'Kenya'
        },
        { 
          name: "Mukuru Kwa Reuben",
          location: 'Kenya'
        },
        { 
          name: "Mukuru Kwa Njenga",
          location: 'Kenya'
        },
        { 
          name: "Baba Dogo",
          location: 'Kenya'
        },
        { 
          name: "Kosovo",
          location: 'Kenya'
        },
        { 
          name: "Mukuru Kayaba",
          location: 'Kenya'
        }
      ])
      .execute()
  }
}