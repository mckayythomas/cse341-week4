const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getClasses = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('vgh').collection('classes').find();
    if (result) {
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    } else {
      return res.status(404).json({ message: 'Unable to find classes' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getOneClass = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() })
    }
    console.log(req.params.id)
    const classId = new ObjectId(req.params.id);
    console.log(classId)
    const result = await mongodb.getDb().db('vgh').collection('classes').findOne({ _id: classId });
    console.log(result)
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      return res.status(404).json({ message: 'Unable to find class' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};


module.exports = { getClasses, getOneClass };