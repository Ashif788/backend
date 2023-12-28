const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  // Define your routes here and use the 'db' connection for database operations

  router.post('/api/addclass/:IId', (req, res) => {
    const classID = req.body.ClassID;
    const classname = req.body.Classname;
    const insertclassID = req.params.IId+"-"+req.body.ClassID;

    const teacherid = req.body.Teachername;
    const iid = req.params.IId;

    const selectSql = 'SELECT * FROM class WHERE Class_Name=?';

    db.query(selectSql, [classID], (selectError, selectResult) => {
      if (selectError) {
        console.error('Database error:', selectError);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data retrieved successfully');
        
        if (selectResult.length > 0) {
          // Class already exists
          console.log('Class already exists');
          res.json({ message: 'Available', data: selectResult });
        } else {
          // Class does not exist, insert it
          const insertSql = 'INSERT INTO class(Class_Id,Class_Name, Class_TeacherID, InstituteCID) VALUES (?,?, ?, ?)';
          db.query(insertSql, [insertclassID,classname, teacherid, iid], (insertError, insertResult) => {
            if (insertError) {
              console.error('Database error:', insertError);
              res.json({ message: 'failed' });
            } else {
              console.log('Data inserted successfully');
              res.json({ message: 'Class added successfully' });
            }
          });
        }
      }
    });
  });

  return router;
};
