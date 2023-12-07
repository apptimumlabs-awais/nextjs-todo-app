import mongoose from "mongoose";  
const schema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted : {
    type : Boolean,
    default : false,
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true ,
    ref : 'User',
  }
});

mongoose.models = {};
export const Task = mongoose.model("Task", schema);