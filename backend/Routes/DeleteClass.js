const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  // Define your routes here and use the 'db' connection for database operations

  router.post('/api/deleteclass/:IId', (req, res) => {
    const ClassID = req.body.ClassID;
    const iid = req.params.IId;
    

    const sql = 'SELECT * FROM class WHERE Class_ID=? AND InstituteCID=?';

    db.query(sql, [ClassID, iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data retrieved successfully');
        if (result.length === 0) {
            console.log(result)
            console.log(ClassID)
          res.json({ message: 'Not found', result });
        } else {
          const sql2 = 'DELETE  FROM class WHERE Class_ID=? AND InstituteCID=?';
          db.query(sql2, [ClassID, iid], (error, deleteResult) => {
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
