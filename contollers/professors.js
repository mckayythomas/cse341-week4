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

const createProfessor = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      let { primerNombre, apellidos, classes, tutor, tutorGrado, tutorSeccion, pay } = req.body;
      grado = parseInt(grado);
      seccion = seccion.toUpperCase();
      pay = parseInt(pay);
  
      const document = {
        primerNombre,
        apellidos,
        classes,
        tutor,
        tutorGrado,
        tutorSeccion,
        pay
        
      };
  
      const result = await mongodb.getDb().db('vgh').collection('profesores').insertOne(document);
      if (result.acknowledged) {
        res.status(201).json({ message: 'Professor created successfully!', id: result.insertedId });
      } else {
        console.error(result.error);
        res.status(500).json({ message: 'Something went wrong.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  
  const deleteProfessor = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).send()
      }
  
      const professorId = new ObjectId(req.params.id);
      const result = await mongodb.getDb().db('vgh').collection('profesores').deleteOne({ _id: professorId });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Professor deleted successfully ' + professorId });
      } else {
        res.status(404).json({ message: 'Professor not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  
  const updateProfessor = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const professorId = new ObjectId(req.params.id);
      const { primerNombre, apellidos, classes, tutor, tutorGrado, tutorSeccion, pay } = req.body;
      const update = { primerNombre: primerNombre, apellidos: apellidos, classes: classes, tutor: tutor, tutorGrado: tutorGrado, tutorSeccion: tutorSeccion, pay };
      const result = await mongodb.getDb().db('vgh').collection('profesores').updateOne({ _id: professorId }, { $set: update });
      console.log(result)
      if (result.matchedCount !== 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Professor not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };

  const getClassesByProfessor = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const professorId = new ObjectId(req.params.id);
        const professor = await mongodb.getDb().db('vgh').collection('profesores').findOne({ _id: professorId });
        if (!professor) {
            return res.status(404).json({ messege: 'Professor not found'});
        }

        const classIds = professor.classes;
        console.log(classIds)
        const result = await mongodb.getDb().db('vgh').collection('class').find({ _id: {$in:classIds}});
        console.log(result)
        if (result) {
            result.toArray().then((lists) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lists);
                });
            }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
  }


module.exports = { getProfessors, getOneProfessor, deleteProfessor, createProfessor, updateProfessor, getClassesByProfessor };