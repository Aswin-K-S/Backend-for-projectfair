const projects = require('../Models/projectSchema')

exports.addUserProject = async (req,res)=>{
    console.log("inside Add userproject");

    //get user id
    const userId = req.payload
    //get Project Image
    const projectImage = req.file.filename
    //get Project details
    const {title,language,github,link,overview}=req.body

    console.log(userId,title,language,github,link,overview);

    // logic for addding project

    try{
        //if github is present in mongodb
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(402).json("project already exists")
        }
        else{
            //if github link is not present in mongodb then create a new project details and save them in mongodb
            const newProject = new projects({
                title,language,github,link,overview,projectImage,userId
            })
            await newProject.save()//save new project in mongoDB
            res.status(200).json(newProject) //response send to client
        }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
    
}

//get all user-projects
exports.getAllUserProjects = async (req,res)=>{
    //get userid
    const userId = req.payload;
    //get all projects of particular user
    try{
        //api call
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)//send all projects to frontend
    }
    catch(err){
        res.status(401).json("Internal server error",+err.message)
    }

}

//get all projects

exports.getAllProjects = async (req,res)=>{

    const searchKey = req.query.search

    const query = {
        language:{
            $regex : searchKey,
            $options:"i"
        }
    }

    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects) //send all projects to frontend
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}


//get home projects
exports.getHomeProjects = async (req,res)=>{
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject) 
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}

//update project details
exports.updateProject = async (req,res)=>{
    const {title,language,github,link,overview,projectImage} = req.body
    const uploadImage = req.file?req.file.filename:projectImage //to hold the new image if any 
    userId = req.payload
    const {pid} = req.params
    try {
        //find the particular project and update the project details and then save to mongodb
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,language,github,link,overview,projectImage:uploadImage,userId})
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}


//Delete user Project
exports.deleteProject = async (req, res) => {
    const { pid } = req.params;
    try {
        
        console.log(pid);
        const deleteProject = await projects.findByIdAndDelete({ _id: pid });
        if (!deleteProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(deleteProject);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
