const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  

  router.get('/api/userdata/:IId', (req, res) => {
    const iid = req.params.IId;
    const sql = 'SELECT * FROM user, institute WHERE InstitutePID = InstituteFID AND InstitutePID = ?';
  
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

  router.get('/api/teacheruserdata/:TId', (req, res) => {
    const iid = req.params.TId;
    const sql = 'SELECT Class_ID ,Class_Name,Name,Email,Address,TInstituteID FROM class,teacher WHERE TeacherID=Class_TeacherID AND TeacherID=?';
  
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
