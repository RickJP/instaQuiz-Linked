const router = require('express').Router();
const Question = require('../models/question.model');
const { processFile } = require('../utilities/InstaQuiz_tsvToJson');

// Get a Set Number of Questions
router.get('/', async (req, res) => {
  try {
    const fields = ['-_id'];
    const limit = req.params.limit || 10;
    const skip = req.params.skip || 0;

    console.log('Getting Questions');

    const questions = await Question.find()
      .select(fields)
      .limit(limit)
      .skip(skip)
      .sort({category: 'asc'});

    res.json(questions);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const questions = await Question.find()
//     res.json(questions)
//   } catch (err) {
//     res.status(400).json({
//       error: err
//     })
//   }
// })
router.get('/import', async (req, res) => {
  try {
    const questionsCount = processFile()
    res.json({ success: true, message: `Imported All Questions into data folder` })
  } catch (err) {
    res.status(400).json({ message: err })
  }
});

module.exports = router;
