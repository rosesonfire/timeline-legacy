import { Column, Model } from 'sequelize-typescript';
import { List, Record, RecordOf } from 'immutable';

import Repository from 'db/_shared/Repository';
import TMTable from 'db/_shared/TMTable';
import { getFilterLogic } from 'db/_shared/helpers';

import PersonDomainModel, { Gender, IPersonRepository } from 'domainModels/Person';
import { Pagination, Sorting } from 'domainModels/types';

interface PersonModelAttrs extends PersonDomainModel {}

interface PersonModelCreationAttrs extends Omit<PersonModelAttrs, 'id'> {}

@TMTable({
  modelName: 'person',
})
export class Person extends Model<PersonModelAttrs, PersonModelCreationAttrs> {
  @Column
  name!: string;

  @Column
  gender!: Gender;
}

export class PersonRepository
  extends Repository<PersonDomainModel, PersonModelAttrs, PersonModelCreationAttrs, Person>
  implements IPersonRepository
{
  constructor() {
    super(Person);
  }

  async filter(
    personDomainModel: RecordOf<Partial<PersonDomainModel>>,
    options?: {
      sorting?: RecordOf<Sorting<PersonDomainModel>>;
      pagination?: RecordOf<Pagination>;
    },
  ) {
    const { name } = personDomainModel.toJSON();

    const personDBObjects = await this._respository.findAll(
      getFilterLogic({
        name,
        ...options,
      }),
    );

    return List(
      personDBObjects.map((personDBObject) => this.mapDBModelToDomainModel(personDBObject)),
    );
  }

  protected mapDomainModelCreationAttributes(personDM: RecordOf<Omit<PersonDomainModel, 'id'>>) {
    return personDM.toJSON();
  }

  protected mapDomainModelToDBModelFieldsForUpdate(personDM: RecordOf<Partial<PersonDomainModel>>) {
    const { id, name, gender } = personDM.toJSON();

    return Record({ id, name, gender })();
  }

  mapDBModelToDomainModel(personDBObject: Person) {
    const dbModelFields = personDBObject.toJSON();
    const newPersonDM = Record<PersonDomainModel>(dbModelFields)();

    return newPersonDM;
  }
}
