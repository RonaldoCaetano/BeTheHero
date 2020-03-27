/*
    ? Método up --> Responsável pela criação da tabela
    ? Método down --> Quando temos um problema, desfazemos alguma coisa
*/
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs')
};
