const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  

  router.get('/api/teacherdetail/:IId', (req, res) => {
    const iid = req.params.IId;
    const sql = 'SELECT TeacherID,Name,DATE_FORMAT(TD_o_b, "%Y-%m-%d") AS TD_o_b,Email,Address,Password FROM teacher WHERE TInstituteID = ?';
  
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
