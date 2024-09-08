const mongoose = require("mongoose");
 
 

const urlSchema = new mongoose.Schema(
    {
      shortId: {
        type: String,
        required: true,
        unique: true,
      },
      redirectURL: {
        type: String,
        required: true,
      },
      visiHistory: [
        {
          timestamp: { type: Number } // Store the timestamp as a Number
        },
      ],
    
    createdBy: {
type: mongoose.Schema.Types.ObjectId,
ref:"users",
    }
  },
    { timeseries: true }
  );
  

const URL = mongoose.model("url",urlSchema);

module.exports = URL;