exports.up = async function (knex) {
    await knex.schema
        .createTable('projects', tbl => {
            tbl.increments('project_id')
            tbl.string('project_name', 121).notNullable()
            tbl.string('project_description', 200)
            tbl.boolean('project_completed').notNullable().defaultTo(0)
        })
        .createTable('resources', tbl => {
            tbl.increments('resource_id')
            tbl.string('resource_name', 132).notNullable().unique()
            tbl.text('resource_description', 200)
        })
        .createTable('tasks', tbl => {
            tbl.increments('task_id')
            tbl.string('task_description', 200).notNullable()
            tbl.text('task_notes', 200)
            tbl.boolean('task_completed').notNullable().defaultTo(0)
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')

        })
        .createTable('project_resources', tbl => {
            tbl.increments('project_resource_id')
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('resource_id')
                .inTable('resources')
        })
};

exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};