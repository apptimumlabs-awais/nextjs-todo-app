
export const errorHandler = (res , status = 500 , message = 'Internal Server error')=>{
 return res.status(status).json({ success : false , message})
};

export const asyncError =(passesFun)=>(req , res)=>{
    return Promise.resolve(passesFun(req, res)).catch((err)=>{ errorHandler(res, 500 , err.message)})
};
