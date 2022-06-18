// build your `Task` model here
const db = require('../../data/dbConfig');

async function findAll() {
    const results = await db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select('task_id', 'task_description',
            'task_notes', 'task_completed',
            'project_name', 'project_description');

    const tasks = results.map(task => ({
        ...task,
        task_completed: task.task_completed ? true : false
    }));

    return tasks;
}

function insert(task) {
    return db('tasks')
        .insert(task)
        .then(([task_id]) => db('tasks').where({
            task_id
        }))
        .then(newTask =>
            newTask.map(task => ({
                ...task,
                task_completed: task.task_completed ? true : false
            }))[0]
        )
        .catch(err => err)
}

module.exports = {
    findAll,
    insert
}