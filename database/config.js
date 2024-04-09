const mongoose = require('mongoose');

const dbConnection = async()=>{
    try{
       await  mongoose.connect(process.env.dbConnection, {
    
       
    });
        console.log('db connection');
    }catch{
        console.log(error);
    }

}
module.exports = {
    dbConnection
}