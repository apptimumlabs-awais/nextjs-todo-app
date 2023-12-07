import { asyncError, errorHandler } from '../../../middlewares/error'
import { User } from "../../../models/user";
import bcrypt from "bcrypt";
import {
  connectDB,
  cookieSetter,
  generateToken,
} from "../../../utils/features";

const handler = asyncError(async(req , res)=>{
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only Post Request is Allowed");
    const {name , email , password} = req.body;
    console.log('req.body :>> ', req.body);
     if(!name || !email || !password ) return errorHandler(res , 400 ,'All felids are required')

     await connectDB();
    let user = await User.findOne({email});

     if (user) return errorHandler(res , 400 , 'User Already exited')
     const hashPassword = await bcrypt.hash(password ,10 )
     user = await User.create({ name, email, password: hashPassword });
     const token =   generateToken(user._id);           
      cookieSetter(res , token  , true)
      
     res.status(201).json({
        success : true,
        message : 'User Registered Successfully',
        user,
        
     })
});

export default handler;