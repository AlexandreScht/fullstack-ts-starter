import config from '@config';
import type { DataStoredInToken, TokenData } from '@interfaces/auth';
import type { User } from '@interfaces/users';
import { sign } from 'jsonwebtoken';

const createToken = (user: User): TokenData => {
  const { email, id } = user;
  const {
    security: { jwt },
  } = config;

  const dataStoredInToken: DataStoredInToken = { User: { id } };
  const expiresIn: number = jwt.EXPRESS_IN;

  return { expiresIn, email, token: sign(dataStoredInToken, jwt.JWT_SECRET, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

export { createCookie, createToken };
