const express=require("express");
const app=express();
const PORT=8000;
const fs = require("fs");
const users=require("./MOCK_DATA.json");

app.use(express.json());

app.use(express.urlencoded({extended:false}))
const userRoutes = require("./userRoutes");

// Use the user routes for /api/users
app.use("/api/users", userRoutes)
  
app.listen(PORT,()=> console.log(`Server running on http://localhost:${PORT}`));