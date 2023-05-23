const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getStudents = async (req, res) => {
  const result = await mongodb.getDb().db('vgh').collection('estudiantes').find();
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    return res.status(404).json({ message: 'Unable to find students' });
  }
};

const getOneStudent = async (req, res) => {
  const studentId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('vgh').collection('estudiantes').find({ _id: studentId });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    return res.status(404).json({ message: 'Unable to find student' });
  }
};

const getClass = async (req, res) => {
  const grado = parseInt(req.params.grado);
  const seccion = req.params.seccion;
  const result = await mongodb.getDb().db('vgh').collection('estudiantes').find({ grado: grado, seccion: seccion });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    return res.status(404).json({ message: 'Class not found.' })
  }
}

const createStudent = async (req, res) => {
  const { primerNombre, apellidos, grado, seccion } = req.body;

  if (
    !req.body.primerNombre ||
    !req.body.apellidos ||
    !req.body.grado ||
    !req.body.seccion
  ) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

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
};

const deleteStudent = async (req, res) => {
  const studentId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('vgh').collection('estudiantes').deleteOne({ _id: studentId });
  if (result.deletedCount === 1) {
    res.status(200).json({ message: 'Student deleted successfully ' + studentId });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

const updateStudent = async (req, res) => {
  const studentId = new ObjectId(req.params.id);
  const { primerNombre, apellidos, grado, seccion } = req.body;
  const filter = { _id: studentId };
  const update = { $set: { primerNombre, apellidos, grado, seccion } };
  const result = await mongodb.getDb().db('vgh').collection('estudiantes').updateOne(filter, update);
  if (result.modifiedCount === 1) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Student not found.' });
  }
};

module.exports = { getStudents, getOneStudent, createStudent, getClass, deleteStudent, updateStudent };