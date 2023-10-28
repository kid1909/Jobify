import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/customErrors.js'

export const getAllJobs = async (req, res) => {
  
  const jobs = await Job.find(req.user.role==='admin' ? {} :{createdBy:req.user.userId})
  res.status(StatusCodes.OK).json({ jobs })
}

export const createAJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
  const { id } = req.params
  const job = await Job.findById(id)

  res.status(StatusCodes.CREATED).json({ job })
}

export const updateJob = async (req, res) => {
  const { id } = req.params
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  res.status(StatusCodes.OK).json({ msg: 'job modifed', job: updatedJob })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  const removeJob = await Job.findByIdAndDelete(id)

  res.status(StatusCodes.OK).json({ job: removeJob })
}
