const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./models/User")
const Comment = require("./models/Comment")

const app = express()
app.use(express.json())
app.use(cors())
const dbUrl = ATLAS_URI = 'mongodb+srv://shreyas:passcode@tinda.q783xqc.mongodb.net/?retryWrites=true&w=majority&appName=Tinda';
//mongoose.connect("mongodb://127.0.0.1:27017/employee");
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    console.log("Email:", email);
    console.log("Password:", password);
    UserModel.findOne({email : email})
    .then(user => {
        console.log("User: ");
        if(user) {
            if(user.password === password){
                res.json({
                    isAuthenticated: true,
                    success: true,
                    message: "Success",
                    user: {
                        name: user.name,
                        email: user.email
                        // Add any other user data you want to return
                    }
                });
            }else{
                res.json("The password is incorrect")
            }
        }else{
          res.status(401).json({
            isAuthenticated: false,
            message: 'Invalid email or password' // Optional error message
          });
        }
    })
})

app.post("/register", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

/*app.post("/comments", async (req, res) => {
    try {
      
      const { username, content, recipeId } = req.body;
  
     
      const newComment = await CommentModel.create({ username, content, recipeId });
  
      
      res.status(201).json(newComment);
    } catch (error) {
      
      console.error("Error saving comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  
  app.get("/comments/:recipeId", async (req, res) => {
    try {

      const { recipeId } = req.params;
  

      const comments = await CommentModel.find({ recipeId });
  
    
      res.status(200).json(comments);
    } catch (error) {
    
      console.error("Error retrieving comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });*/

app.post("/like", async (req, res) => {
    try {
      const { name, recipeName } = req.body;
      console.log("Request Body:", req.body); 
      const user = await UserModel.findOne({name : name})
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.likedRecipes.push(recipeName);
      await user.save();
      res.status(200).json({ message: "Recipe liked successfully" });
    } catch (error) {
      console.error("Error saving liked recipe:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
app.get('/comments', async (req, res) => {
  try {
    const recipeId = req.query.recipeId;
    const comments = await Comment.find({ recipeId: recipeId });

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error' });
  }
  });
  
  // Post comment
app.post('/comments', async (req, res) => {
    try {
      const { content, username, recipeId, imageData } = req.body;
      const newComment = new Comment({ content, username, recipeId, imageData });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

app.listen(3001, () => {
    console.log("server is running")
})