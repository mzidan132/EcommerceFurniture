import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if (!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
//make sure the order is from the user that has chose the cart so match both token decodes id
export default authMiddleware;