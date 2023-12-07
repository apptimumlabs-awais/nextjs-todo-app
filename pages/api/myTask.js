import { checkAuth, connectDB } from "../../utils/features";
import { Task } from "../../models/task";
import { errorHandler, asyncError } from "../../middlewares/error";
const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET Request is Allowed");
  console.log("before connectDB() :>> ");
  await connectDB();
  console.log("after connectDB() :>> ");

  const user =  await checkAuth(req);
  if (!user) return errorHandler(res , 401 ,'Login First ')
  const todos =   await Task.find({user :user._id  });
  res.json({ success: true , todos });
});
export default handler;
