// require('dotenv').config({path:'./env'})

 import dotenv from "dotenv"
import app from "./app.js"
import ConnectDB from "./db/Connect.js"

 dotenv.config({path:'./env'})

ConnectDB()
.then(()=>{
    app.listen(process.env.PORT || 3001 ,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongodb connection failed",err)
})

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