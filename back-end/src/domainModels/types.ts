import { List, RecordOf } from 'immutable';

export abstract class Repository<DM extends {}> {
  abstract create(domainModel: RecordOf<DM>): Promise<RecordOf<DM>>;
  abstract filter(domainModel: RecordOf<Partial<DM>>): Promise<List<RecordOf<DM>>>;
}
