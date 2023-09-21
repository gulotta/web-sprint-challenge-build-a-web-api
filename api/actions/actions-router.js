// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const {
validateId
} = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)

})

router.get('/:id', validateId, (req, res) => {
    res.json(req.action)
})

router.post('/:id', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})



module.exports = router