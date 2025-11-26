/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('likes', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('post_id')
    table.integer('reply_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('likes')
}
