// add middlewares here related to actions
const Actions = require('./actions-model')

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timestamp}] ${method} to ${url}`)
    next()
}

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
           res.status(404).json({
            message:"Action with the specified id does not exist"
           })
        } else {
            req.action = action
            next()
        }
    } catch(err) {
        req.status(500).json({
            message: 'Problem finding action'
        })
    }
    
}

function validateAction(req, res, next) {
    const {description, notes, project_id, completed} = req.body
    if(
        !description || !description.trim() ||
        !notes || !notes.trim() ||
        !project_id ||
        completed === undefined
    ) {
        res.status(400).json({
            message: 'Please include all required project_id, description, notes, and completed fields'
        })
    } else if (description.length > 128) {
        res.status(400).json({
            message: 'Description exceeds 128 character limit'
        })
    } else {
        req.description = description.trim()
        req.notes = notes.trim()
        next()
    }
}

module.exports = {
    logger, 
    validateActionId,
    validateAction
}