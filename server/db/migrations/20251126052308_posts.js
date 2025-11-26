/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('date_added')
    table.string('message')
    table.string('image')
    table.string('font')
    table.integer('char_limit')
    table.boolean('public')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('posts')
}
