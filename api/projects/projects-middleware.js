// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next){
    try {
        const project = await Projects.get(req.params.id)
        if(project){
            req.project = project
            next()
        } else {
            next({
                status: 404,
                message: "No project found"
            })
        }
    }catch(err){
        next()
    }
}

async function validateProject (req, res, next) {
    try {
        const {name, description, completed} = req.body 
        if(!name || !description || completed === undefined){
            res.status(400).json({
                message: 'Missing valid information'
            })
        } else {
            next()
        }
    }
    catch(err){
        console.log(err)
    }
    
}



module.exports = {
    validateProjectId,
    validateProject

}