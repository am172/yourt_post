const express = require("express");
const cors = require("cors");
const User = require('./models/User.js')
const Post = require('./models/Post.js')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const salt = bcrypt.genSaltSync(10);
const secert = 'ksdfjksjafkljfdkfjsd'
const jwt = require('jsonwebtoken')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
const app = express();
const fs = require('fs');
app.use(cors({ credentials: true, origin: "https://yourt-post-12.onrender.com/" }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.post("/register", async (req, res) => {
    const { userName, password } = req.body;
    try {
        const UserDoc = await User.create({
            userName,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(UserDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});


app.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    const userDoc = await User.findOne({ userName });

    if (!userDoc) {
        return res.status(400).json({ message: "User not found" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
        return res.status(400).json({ message: "Wrong credentials" });
    }

    jwt.sign({ userName, id: userDoc._id }, secert, {}, (err, token) => {
        if (err) return res.status(500).json({ message: "Token generation error" });

        res.cookie("token", token, { httpOnly: true, secure: false }).json({ message: "ok" });
    });
});




app.get("/", (req, res) => {
    res.send("Hello World");
});



app.get("/register", (req, res) => {
    res.send("ahlan y ");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.get("/profile", (req, res) => {
    const token = req.cookies.token; // تعديل هنا

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, secert, (err, userInfo) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        res.json(userInfo);
    });
});


app.post("/post", uploadMiddleware.single('file'), async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);

        const { title, summary, content } = req.body;


        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
        });

        res.json({ postDoc });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "حدث خطأ أثناء إنشاء البوست." });
    }
});



app.get("/post", async (req, res) => {
    res.json(
        await Post.find()
            .sort({ createdAt: -1 })
            .limit(20)

    );
});


app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id);
    res.json(postDoc);
})






// MongoDB connection
mongoose.connect("mongodb+srv://hmnm5485:442004@amr.pl1ea.mongodb.net/?retryWrites=true&w=majority&appName=amr")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
