const express=require("express");
const app=express();
const PORT=8000;
const fs = require("fs");
const users=require("./MOCK_DATA.json");

app.use(express.json());

app.use(express.urlencoded({extended:false}))
app.get("/api/users",(req,res)=>{
    return res.json(users);
})
app.get("/api/users/:id",(req,res)=>{
    const id= Number(req.params.id);
    const user=users.find((user)=> user.id===id);
    return res.json(user);
})
app.post("/api/users",(req,res)=>{
    const newUser=req.body;
    users.push({...newUser,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
       
        return res.status(201).json(newUser);
    });
})
app.put("/api/users/:id", (req, res) => {
    const id = Number(req.params.id); // Convert id to a number
    const index = users.findIndex((user) => user.id === id); // Find the index of the user with the given id
  
    if (index === -1) {
      return res.status(404).json({ error: "User not found" }); // Return 404 if user is not found
    }
  
    // Merge the existing user data with the updated data from the request body
    users[index] = { ...users[index], ...req.body };
  
    // Save the updated array to the file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update user data" }); // Handle file write errors
      }
      return res.json(users[index]); // Return the updated user object
    });
  });
  
app.delete("/api/users/:id", (req, res) => {
    console.log("DELETE request received for ID:", req.params.id);
    const id = Number(req.params.id); 
    const userIndex = users.findIndex((user) => user.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" }); 
    }
  
    
    const deletedUser = users.splice(userIndex, 1);
    
   
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving data" });
      }
      return res.status(200).json({ message: "User deleted", deletedUser });
    });
  });
  
app.listen(PORT,()=> console.log(`Server running on http://localhost:${PORT}`));