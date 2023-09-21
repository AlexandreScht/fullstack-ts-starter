import { Knex } from 'knex';

module.exports.up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('users', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('email', 125).notNullable();
    table.text('password').nullable();
    table.enu('role', ['admin', 'user']).defaultTo('user').notNullable();
    table.boolean('validate').notNullable().defaultTo(false);
    table.boolean('passwordReset').notNullable().defaultTo(false);
    table.string('accessToken', 125).nullable();
    table.string('stripeCustomer', 64).nullable();
    table.timestamp('stripeBilling').nullable();
    table.timestamps(true, true, true);
  });
};

module.exports.down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('users');
};
