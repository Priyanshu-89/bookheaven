import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    catTitle: {
      type: String,
      
    },
    catDesc: {
      type: String,
      
    }
  },
  
);

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
