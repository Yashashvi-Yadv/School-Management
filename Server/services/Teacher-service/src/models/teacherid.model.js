import mongoose from "mongoose";

const teacheridschema = new mongoose.Schema({
    teacherid:{
        type:Number, 
        require:true,
    },
    teacher:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher",}
    ]
},
  { timestamps: true }
)

const TeacheridModel =  mongoose.model("teacherid", teacheridschema);
export default TeacheridModel;