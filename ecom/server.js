//npm install express mongoose jsonwebtoken bcrypt cors dotenv body-parser multer(image) stripe validator nodemon
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import jwt from 'jsonwebtoken'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import admin from "./firebase.js"
import User from "./models/models/User.js"

//app config


const app = express();
app.use(bodyParser.json());
const port = 8000

//middleware
app.use(express.json())
app.use(cors({
    origin: '*', // replace with your frontend domain
    credentials: true
}));
//frontend backend port connect
app.use("/api/user", userRouter) //default set
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
//db con
connectDB()

//api endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))//shows image in website multer

app.get("/", (req, res) => {
    res.send('Api Working')
})

//google login
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function verifyToken(req, res, next) {
    const idToken = req.headers.authorization;

    if (!idToken) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = {
            userId: decodedToken.uid, // Change uid to userId
            name: decodedToken.name,
            email: decodedToken.email,
            picture: decodedToken.picture
        };
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
}

app.post("/api/protected", verifyToken, async (req, res) => {
    const { userId, name, email, picture } = req.user;

    let user = await User.findOne({ userId });

    if (!user) {
        user = new User({ userId, name, email, picture });
        await user.save();
    }
    const token = createToken(user._id); // pass as param as id
    res.json({ success: true, token })
});


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET) //sign user's id to make jwt secret token
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

