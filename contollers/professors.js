const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getProfessors = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('vgh').collection('profesores').find();
    if (result) {
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    } else {
      return res.status(404).json({ message: 'Unable to find professors' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getOneProfessor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() })
    }

    const professorId = new ObjectId(req.params.id);
    console.log(professorId)
    const result = await mongodb.getDb().db('vgh').collection('profesores').findOne({ _id: professorId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      return res.status(404).json({ message: 'Unable to find professor' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};


module.exports = { getProfessors, getOneProfessor };