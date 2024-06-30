// require('dotenv').config({path:'./env'})

 import dotenv from "dotenv"

import ConnectDB from "./db/Connect.js"

 dotenv.config({path:'./env'})

ConnectDB();

// ;(async()=>{
//     try {
//        await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log(error);
//             throw error;
//         })
//         app.listen(`${process.env.PORT}`,()=>{
//             console.log(`app is listening on ${process.env.PORT}`)
//         })
//     } catch (error) {
//      console.log("Err:",error)
        
//     }

// })()