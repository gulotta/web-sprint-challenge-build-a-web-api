// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            next({status: 404, message: 'id not found'})
        } else {
            req.action = action
            next()
        }
    } catch(err) {
        req.status(500).json({
            message: 'problem finding id'
        })
    }
    
}

module.exports = {
    validateId
}