const db = require('../../data/dbConfig')


const checkResourceName = async (req, res, next) => {
    try {
        const existing = await db('resources')
            .where('resource_name', req.body.resource_name)
            .first()
        if (existing) {
            next({
                status: 404,
                message: 'resource_name already exist'
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkResourceName
}