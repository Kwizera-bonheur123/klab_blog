import app from "./app";
import mongoose from "mongoose";

mongoose.set("strictQuery", false)
mongoose.connect(process.env.dbConnection)
    .then(()=>{
        console.log("Db Connection Well");
    })
   .catch((err)=> console.log(err))

   const PORT = process.env.PORT || 4300;

   app.listen(process.env.PORT, ()=>{
    console.log(`Server running on PORT: http://localhost:${PORT}`);
   })


