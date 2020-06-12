const mongoose = require('mongoose');



const TODOSchema = mongoose.Schema({
        title:{
          type:String,
          require:true
        },
        dateLimit:{
          type:Date,
          require:true
        },
        description:{
          type:String,
          require:true
        },
        priority:{
          type:String,
          require:true
        }
      })
const Todo = module.exports = mongoose.model('Todo',TODOSchema);

