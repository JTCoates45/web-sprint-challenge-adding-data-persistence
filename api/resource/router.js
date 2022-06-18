// build your `/api/resources` router here
const router = require('express').Router()
const Resources = require('./model')
const {
    checkResourceName
} = require('./middleware')

router.get('/', async (req, res, next) => {
    try {
        const resource = await Resources.getAll()
        res.json(resource)
    } catch (err) {
        next(err)
    }
})
router.post('/', checkResourceName, async (req, res, next) => {
    try {
        const resource = await Resources.create(req.body)
        res.json(resource)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res) => {
    res.status(500).json({
        customMessage: 'ERROR ERROR something went wrong in the resource router',
        message: err.message,
        stack: err.stack

    })
})

module.exports = router