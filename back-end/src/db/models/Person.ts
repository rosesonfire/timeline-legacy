import { Op } from 'sequelize';
import { Column, Model } from 'sequelize-typescript';
import { List, Record, RecordOf } from 'immutable';

import Repository from 'db/_shared/Repository';
import TMTable from 'db/_shared/TMTable';

import PersonDomainModel, { Gender, IPersonRepository } from 'domainModels/Person';
import { Pagination } from 'domainModels/types';

@TMTable({
  modelName: 'person',
})
export class Person extends Model<PersonDomainModel> {
  @Column
  name!: string;

  @Column
  gender!: Gender;
}

export class PersonRepository extends Repository<PersonDomainModel> implements IPersonRepository {
  constructor() {
    super(Person);
  }

  async filter(personDM: RecordOf<Partial<PersonDomainModel>>, pagination?: RecordOf<Pagination>) {
    const { name } = personDM.toJSON();

    const persons = await Person.findAll({
      where: {
        name: {
          [Op.like]: name ? `%${name}%` : '%',
        },
      },
      offset: pagination?.offset,
      limit: pagination?.pageSize,
    });

    return List(persons.map(this.mapDBModelToDomainModel));
  }

  protected mapDomainModelToDBModel(personDM: RecordOf<PersonDomainModel>) {
    const createdDBObject = new Person({ ...personDM.toJSON() });

    return createdDBObject;
  }

  protected mapDomainModelToDBModelFields(personDM: RecordOf<Partial<PersonDomainModel>>) {
    return personDM;
  }

  protected mapDBModelToDomainModel(personDBObject: Person) {
    const dbModelFields = personDBObject.toJSON();
    const newPersonDM = Record<PersonDomainModel>(dbModelFields)();

    return newPersonDM;
  }
}
