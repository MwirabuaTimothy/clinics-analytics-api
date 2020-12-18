import { Factory, Seeder } from 'typeorm-seeding'
import { Visit } from '../entities/Visit'

import * as Faker from "faker"
import { define } from "typeorm-seeding"

// Visit Factory
define(Visit, (faker: typeof Faker) => {
  const visit = new Visit()
  const gender = faker.random.number(1)
  visit.patient = faker.name.firstName(gender) + ' ' + faker.name.lastName(gender)
  visit.time = faker.date.between('2019-12-01', '2020-12-01').toDateString()
  visit.fee = (Math.floor(Math.random() * 40)*50) + 500
  visit.promoter_score = Math.floor(Math.random() * 5) + 6
  visit.clinicId = Math.floor(Math.random() * 6) + 1
  visit.issueId = Math.floor(Math.random() * 6) + 1
  return visit
})

// Visit Seeder
export default class VisitsSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Visit)().createMany(20)
  }
}