const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    category: {
      type: String,
    },
    difficulty: {
      type: Number,
    },
    question: {
      type: String,
    },
    A: {
      type: String,
    },
    B: {
      type: String,
    },
    C: {
      type: String,
    },
    D: {
      type: String,
    },
  },
  {time: {type: Date, default: Date.now}}
);



    

const Question = mongoose.model('question', questionSchema, 'InstaQuiz-questions');

module.exports = Question;
