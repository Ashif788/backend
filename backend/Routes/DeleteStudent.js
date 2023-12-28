const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  // Define your routes here and use the 'db' connection for database operations

  router.post('/api/deletestudent/:IId', (req, res) => {
    const SId = req.body.SId;
    const iid = req.params.IId;

    const sql = 'SELECT * FROM student WHERE Regno=? AND SInstituteID=?';

    db.query(sql, [SId, iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data retrieved successfully');
        if (result.length === 0) {
            console.log(result)
          res.json({ message: 'Not found', result });
        } else {
          const sql2 = 'DELETE  FROM student WHERE Regno=? AND SInstituteID=?';
          db.query(sql2, [SId, iid], (error, deleteResult) => {
            if (error) {
              console.error('Database error:', error);
              res.status(500).json({ error: 'Data deletion failed' });
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
