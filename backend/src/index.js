import express from 'express';
import authorizationRoutes from './routes/authorization.routes.js';
const app=express()

app.use("/api/auth", authorizationRoutes);

app.listen(5001,()=>{
    console.log("Server is running on port 5001");
    
})