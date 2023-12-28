const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  

  router.get('/api/updatestudentdetails/:SId', (req, res) => {
    const Sid = req.params.SId;
    const sql = 'SELECT  Regno, Name, DATE_FORMAT(StudentDOB, "%Y-%m-%d") AS StudentDOB, Father_name, Mother_name, Address, SClassID FROM student WHERE Regno = ?';
  
    db.query(sql, [Sid], (error, result) => {
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
