const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  

  router.get('/api/totalteacher/:IId', (req, res) => {
    const iid = req.params.IId;
    const sql = 'SELECT COUNT(TeacherID)"total" FROM teacher WHERE TInstituteID=?';
  
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
