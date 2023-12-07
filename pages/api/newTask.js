import { checkAuth, connectDB } from "../../utils/features";
import { Task } from "../../models/task";
import { errorHandler, asyncError } from "../../middlewares/error";
const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only Post Request is Allowed");
  await connectDB();

  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First ");
  const { task, description } = req.body;
  if (!task || !description) return errorHandler(res, 400, "All the fields are required ");

  await Task.create({
    task,
    description,
    user: user._id,
  });
  res.json({ success: true , message : 'Task Created Successfully' });
});
export default handler;
