const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  router.get('/api/studentdetail/:IId', (req, res) => {
    const iid = req.params.IId;
    const sql = 'SELECT  Regno, Name, DATE_FORMAT(StudentDOB, "%Y-%m-%d") AS StudentDOB, Father_name, Mother_name, Address, SClassID FROM student WHERE SInstituteID = ?';
  
    db.query(sql, [iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
      }
    });
  });
  
  router.get('/api/teacherstudentdetail/:TId', (req, res) => {
    const iid = req.params.TId;
    const sql = 'SELECT  Regno, Name, DATE_FORMAT(StudentDOB, "%Y-%m-%d") AS StudentDOB, Father_name, Mother_name, Address, SClassID FROM student WHERE SClassID IN (SELECT Class_ID FROM class WHERE Class_TeacherID=?) ';
  
    db.query(sql, [iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
      }
    });
  });
 
  
 
  return router;
};
