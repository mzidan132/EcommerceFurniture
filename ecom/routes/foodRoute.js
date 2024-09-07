import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
//import multer from 'multer'

const foodRouter = express.Router()

/*
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
*/

foodRouter.post("/add", (req, res) => {
    try {
        const { image } = req.body;  // Extract the image URL from the request body

        // Add imageUrl to the request body before calling the controller
        req.body.image = image;

        // Now call the addFood controller
        addFood(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)


export default foodRouter