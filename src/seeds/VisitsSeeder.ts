import { Factory, Seeder } from 'typeorm-seeding'
import { Visit } from '../entities/Visit'

export default class VisitsSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Visit)().createMany(100)
  }
}