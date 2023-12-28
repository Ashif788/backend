const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  

  router.get('/api/totalstudent/:IId', (req, res) => {
    const iid = req.params.IId;
    const sql = 'SELECT SClassID ,COUNT(Regno)"total" FROM student WHERE SInstituteID=? GROUP BY SClassID';
  
    db.query(sql, [iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
       
        
      }
    });
  });
  

  router.get('/api/totalstudent2/:IId', (req, res) => {
    const iid = req.params.IId;
    const sql = 'SELECT COUNT(Regno)"total" FROM student WHERE SInstituteID=? ';
  
    db.query(sql, [iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
       
        
      }
    });
  });
  

  router.get('/api/teachertotalstudent2/:TId', (req, res) => {
    const iid = req.params.TId;
    const sql = 'SELECT COUNT(Regno)"total" FROM student WHERE SClassID IN (SELECT Class_ID from class WHERE Class_TeacherID=?) ';
  
    db.query(sql, [iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
       
        
      }
    });
  });
  return router;
};
