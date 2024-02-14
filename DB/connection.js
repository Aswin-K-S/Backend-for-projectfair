// node + mongoDB connection

const mongoose =  require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("mongoDB connection established");
})
.catch(err =>{
    console.log("mongoDB connection error" +  err.message);
})