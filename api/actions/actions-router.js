// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const {
validateActionId,
validateAction,
} = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)

})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})


router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(updatedAction => {
        res.status(200).json(updatedAction)
    })
    .catch(next)
})



router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
    .then(action => {
        res.status(204).json(action)
    })
    .catch(next)
})

router.use((err, req, res ) => {
    res.status(err.status || 500).json({
        customMessage: 'actions router error',
        message: err.message,
        stack: err.stack
    })
})



module.exports = router