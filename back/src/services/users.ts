import { InvalidCredentialsError, InvalidSessionError } from '@exceptions';
import { AuthRegister } from '@interfaces/auth';
import { UserModel, UserShape } from '@models/users';
import { hash } from 'bcrypt';
import type { Knex } from 'knex';
import { Transaction } from 'objection';
import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

@Service()
class UsersServiceFiles {
  get getModel(): Knex<any, any[]> {
    return UserModel.knex();
  }

  public async findUserById(id: number): Promise<[boolean, UserModel?]> {
    const findUser: UserModel = await UserModel.query().findById(id);
    if (!findUser) {
      return [true];
    }
    return [false, findUser];
  }

  public async findUserByEmail(email: string): Promise<[boolean, UserModel?]> {
    const findUser: UserModel = await UserModel.query().findOne({ email });
    if (!findUser) {
      return [true];
    }
    return [false, findUser];
  }

  public async findUserOAuth(email: string): Promise<[boolean, UserModel?]> {
    const findUser: UserModel = await UserModel.query().findOne({ email }).whereNull('password');
    if (!findUser) {
      return [true];
    }
    return [false, findUser];
  }

  public async register(userData: AuthRegister, trx?: Transaction): Promise<UserModel> {
    if (userData?.password) {
      const hashedPassword = await hash(userData.password, 10);
      return await UserModel.query(trx).insert({ ...userData, password: hashedPassword, accessToken: uuid().replace(/-/g, '') });
    }
    return await UserModel.query().insert({ ...userData, validate: true });
  }

  public async login(userData: UserModel, password: string): Promise<UserShape> {
    if (!(await userData.checkPassword(password))) {
      throw new InvalidCredentialsError('Email or Password is incorrect');
    }
    return userData;
  }

  public async ValidateUserAccount(token: string): Promise<void> {
    const updatedCount: number = await UserModel.query()
      .where('accessToken', token)
      .where('validate', false)
      .patch({ validate: true, accessToken: null });

    if (!updatedCount) {
      throw new InvalidSessionError();
    }
  }
}

export default UsersServiceFiles;
