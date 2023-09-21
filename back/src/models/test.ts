import { Model, ModelObject } from 'objection';

export class TestModel extends Model {
  id: number;
  name: string;

  static tableName = 'test';
  static idColumn = 'id';
}

export type UserShape = ModelObject<TestModel>;
