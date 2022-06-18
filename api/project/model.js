const db = require('../../data/dbConfig');

function findAll() {
    return db('projects')
        .then(projects =>
            projects.map(proj => ({
                ...proj,
                project_completed: proj.project_completed ? true : false
            }))
        )
        .catch(err => err)
}

function insert(project) {
    return db('projects')
        .insert(project)
        .then(([project_id]) => db('projects').where({
            project_id
        }))
        .then(newProj =>
            newProj.map(proj => ({
                ...proj,
                project_completed: proj.project_completed ? true : false
            }))[0]
        )
        .catch(err => err)
}

module.exports = {
    findAll,
    insert
}