const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getStudents = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('vgh').collection('estudiantes').find();
    if (result) {
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    } else {
      return res.status(404).json({ message: 'Unable to find students' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getOneStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() })
    }

    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('vgh').collection('estudiantes').findOne({ _id: studentId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      return res.status(404).json({ message: 'Unable to find student' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getClass = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const grado = parseInt(req.body.grado);
    const seccion = req.body.seccion.toUpperCase();
    const result = await mongodb.getDb().db('vgh').collection('estudiantes').find({ grado: { $eq: grado }, seccion: { $eq: seccion }});

    if (result) {
      result.toArray().then((lists) => {
        res.status(200).json(lists);
      });
    } else {
      return res.status(404).json({ message: 'Class not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
}

const createStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { primerNombre, apellidos, grado, seccion } = req.body;
    grado = parseInt(grado);
    seccion = seccion.toUpperCase();

    const document = {
      contact: {
        primerNombre,
        apellidos,
        grado,
        seccion
      }
    };

    const result = await mongodb.getDb().db('vgh').collection('estudiantes').insertOne(document);
    if (result.acknowledged) {
      res.status(201).json({ message: 'Student created successfully!', id: result.insertedId });
    } else {
      console.error(result.error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).send()
    }

    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('vgh').collection('estudiantes').deleteOne({ _id: studentId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Student deleted successfully ' + studentId });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const studentId = new ObjectId(req.params.id);
    const { primerNombre, apellidos, grado, seccion } = req.body;
    const update = { primerNombre: primerNombre, apellidos: apellidos, grado: grado, seccion: seccion };
    const result = await mongodb.getDb().db('vgh').collection('estudiantes').updateOne({ _id: studentId }, { $set: update });
    console.log(result)
    if (result.matchedCount !== 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Student not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = { getStudents, getOneStudent, createStudent, getClass, deleteStudent, updateStudent };
