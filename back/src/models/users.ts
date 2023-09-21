import { User } from '@interfaces/users';
import { compare } from 'bcrypt';
import { Model, ModelObject, QueryBuilder } from 'objection';

export class UserModel extends Model implements User {
  id: number;
  email: string;
  role: 'admin' | 'user';
  password: string;
  validate: boolean;
  accessToken: string;

  static tableName = 'users';
  static idColumn = 'id';

  static modifiers = {
    paginate: (query: QueryBuilder<UserModel, UserModel[]>, limit: number, page: number) => query.limit(limit).offset((page - 1) * limit),
  };

  checkPassword = async (password: string): Promise<boolean> => {
    return await compare(password, this.password);
  };
}

export type UserShape = ModelObject<UserModel>;
