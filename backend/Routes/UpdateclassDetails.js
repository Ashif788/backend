const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  

  router.get('/api/updateclassdetails/:CId', (req, res) => {
    const Cid = req.params.CId;
    const sql = 'SELECT Class_ID,Class_Name from class where Class_ID=? '  ;
  
    db.query(sql, [Cid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
        
       
        
      }
    });


  });

   router.put('/api/updateclass/:IId/:CId', (req, res) => {
    const classID = req.params.IId + "-" + req.body.ClassID;
    const classname = req.body.Classname;
    const teacherid = req.body.Teachername;
    const CId = req.params.CId;

    if (!classID || !classname || !teacherid) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sqlSelect = "SELECT * FROM class WHERE Class_ID=?";
    db.query(sqlSelect, [classID], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Data fetch failed' });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }

      const sqlUpdate = 'UPDATE `class` SET `Class_ID` = ?, `Class_Name` = ?, `Class_TeacherID` = ? WHERE `class`.`Class_ID` = ?';
      db.query(sqlUpdate, [classID, classname, teacherid, CId], (error, updateResult) => {
        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ error: 'Data update failed' });
        }

        if (updateResult.affectedRows === 0) {
          return res.status(404).json({ error: 'Record not updated' });
        }

        console.log('Data updated successfully');
        return res.json({ message: 'Data updated successfully', updateResult });
      });
    });
  });
  
  return router;
};
