import { Factory, Seeder } from 'typeorm-seeding'
import { Visit } from '../entities/Visit'
import { Connection } from "typeorm";

// import { define } from "typeorm-seeding"
import * as Faker from "faker"

// Visit Factory
// define(Visit, (faker: typeof Faker) => {
//   const visit = new Visit()
//   const gender = faker.random.number(1)
//   visit.patient = faker.name.firstName(gender) + ' ' + faker.name.lastName(gender)
//   visit.time = faker.date.between('2019-12-01', '2020-12-01').toDateString()
//   visit.fee = (Math.floor(Math.random() * 40)*50) + 500
//   visit.promoter_score = Math.floor(Math.random() * 5) + 6
//   visit.clinicId = Math.floor(Math.random() * 6) + 1
//   visit.issueId = Math.floor(Math.random() * 6) + 1
//   return visit
// })

// Visit Seeder
export default class VisitsSeeder implements Seeder {
  // public async run(factory: Factory): Promise<any> {
  //   await factory(Visit)().createMany(20)
  // }
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    let startDate = new Date(2019, 12, 1);
    let finalDate = new Date(2021, 1, 1);
    let visits:any = [];
    for (var date = startDate; date <= finalDate; date.setDate(date.getDate() + 1)) {
      let datestamp = new Date(date).toISOString().slice(0, 10).replace('T', ' ');
      
      let dayVisits = [];
    
      let visitsPerDay =  Math.floor(Math.random() * 8) + 6
      for (let i = 0; i <  visitsPerDay; i++) {
        const gender = Faker.random.number(1)
        const visit = new Visit()
        visit.patient = Faker.name.firstName(gender) + ' ' + Faker.name.lastName(gender),
        visit.time = datestamp,
        visit.fee = (Math.floor(Math.random() * 40)*50) + 500,
        visit.promoter_score = Math.floor(Math.random() * 5) + 6,
        visit.clinicId = Math.floor(Math.random() * 6) + 1,
        visit.issueId = Math.floor(Math.random() * 6) + 1
        dayVisits.push(visit)
      }
      visits = visits.concat(dayVisits)
    }
    console.log('visits.length:', visits.length)
    await connection.manager.save(visits)
  }
}
