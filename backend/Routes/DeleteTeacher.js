const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
 

  router.post('/api/deleteteacher/:IId', (req, res) => {
    const SId = req.body.TeacherID;
    const iid = req.params.IId;
  
    const sql = 'SELECT * FROM teacher WHERE TeacherID=? AND TInstituteID=?';
  
    db.query(sql, [SId, iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data retrieved successfully');
        if (result.length === 0) {
          res.json({ message: 'Not found', result });
        } else {
          const sql2 = 'DELETE FROM teacher WHERE TeacherID=? AND TInstituteID=?';
          db.query(sql2, [SId, iid], (error, deleteResult) => {
            if (error) {
              console.error('Database error:', error);
              if (error.code === 'ER_ROW_IS_REFERENCED') {
                // Handle foreign key reference error
                res.status(500).json({ error: 'Foreign key constraint violation' });
              } else {
                res.json({ error: 'Data deletion failed' });
              }
            } else {
              res.json({ message: 'found', deleteResult });
              console.log('Data deleted successfully');
            }
          });
        }
      }
    });
  });
  

  return router;
};
