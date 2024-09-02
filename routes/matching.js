// routes/matching.js
const express = require('express');
const JobPost = require('../models/jobPosts');
const StudentReq = require('../models/studentRequests');
const auth = require('../middleware/auth');
const router = express.Router();

// Find Best Students for a Job
router.post('/job', auth, async (req, res) => {
  const { jobId } = req.body;

  try {
    const job = await JobPost.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Match students based on location and availability
    const matchedStudents = await StudentReq.find({
      location: job.location,
      availability: { $in: Object.keys(job.availability) },
    });

    res.json(matchedStudents);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Find Best Jobs for a Request
router.post('/request', auth, async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await StudentReq.findById(requestId);
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    // Match jobs based on location and availability
    const matchedJobs = await JobPost.find({
      location: request.location,
      availability: { $in: Object.keys(request.availability) },
    });

    res.json(matchedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
