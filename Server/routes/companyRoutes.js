import express from 'express'
import { ChangeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
const router =express.Router()

router.post('/register',upload.single('image'),registerCompany)

router.post('/login',loginCompany)

router.get('/company',getCompanyData)

router.post('/post-job',postJob)

router.get('/applicants',getCompanyJobApplicants)

router.get('/list-jobs',getCompanyPostedJobs)

router.post('/change-status',ChangeJobApplicationsStatus)

router.post('/change-visibility',changeVisibility)

export default router