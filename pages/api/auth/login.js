import { asyncError, errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/user";
import bcrypt from "bcrypt";
import {
  connectDB,
  cookieSetter,
  generateToken,
} from "../../../utils/features";

const handler = asyncError(async (req, res) => {
    if (req.method !== "POST")
      return errorHandler(res, 400, "Only Post Request is Allowed");
  const { email, password } = req.body;

  if (!email || !password)
    return errorHandler(res, 400, "All felids are required");

  await connectDB();
  const user = await User.findOne({ email }).select('+password');
  if (!user) return errorHandler(res, 400, "Invalid Email and Password");
  const isMatch = await bcrypt.compare(password , user.password);
  if (!isMatch) return errorHandler(res, 400, "Invalid Email and Password");

  const token = generateToken(user._id);
  cookieSetter(res, token, true);

  res.status(200).json({
    success: true,
    message: `welcome Back ${user.name}`,
    user
  });
});

export default handler;
