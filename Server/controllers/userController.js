import { response } from "express"
import Job from "../models/Job.js"
import JobApplication from "../models/JobApplications.js"
import User from "../models/User.js"
import {v2 as cloudinary} from 'cloudinary'
export const getUserData=async(req,res)=>{
const userId=req.auth.userId
try {
    const user=await User.findById(userId)
    if(!user){
        return res.json({success:false, message:'User Not Found'})


    }
    res.json({success:true, user})
} catch (error) {
    res.json({success:false,message:error.message})
}
}

export const applyForJob=async(req,res)=>{

    const{jobId}=req.body
    const userId=req.auth.userId
    try {
        const isAlreadyApplied=await JobApplication.find({jobId,userId})
        if(isAlreadyApplied.length>0){
            return res.json({success:false,message:'Already Applied'})
        }
        const jobData=await Job.findById(jobId)
if (!jobData) {
    return res.json({success:false,message:'job not found'})
    
}
const userData=await User.findById(userId);
await JobApplication.create({
    companyId:jobData.companyId,
    userId,
    jobId,
    date:Date.now(),
    status:'Pending',
    resume:userData.resume
})
res.json({
    success:true, message:'applied successfully'
})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
export const getUserJobApplications=async(req,res)=>{
try {
    const userId =req.auth.userId
    const application=await JobApplication.find({userId})
    .populate('companyId','name email image')
    .populate('jobId','title description location category level salary')
    .exec()
    if (application.length===0) {
        return res.json({
            success:false,message:'No job application found'
        })

        
    }
    return res.json({success:true,application})
} catch (error) {
    res.json({success:false,message:error.message})
}
}

export const updateUserResume=async(req,res)=>{

try{
    const userId=req.auth.userId
    const resumeFile=req.file
    const userData=await User.findById(userId)
    if (resumeFile) {
        const resumeUpload=await cloudinary.uploader.upload(resumeFile.path)
     userData.resume=resumeUpload.secure_url
    }

await userData.save()
return res.json({success:true,message:'resume updated'})
}
catch(error){
    res.json({success:false,message:error.message})

}

}