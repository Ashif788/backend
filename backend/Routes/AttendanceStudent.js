const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  

  router.get('/api/attendance/:TId', (req, res) => {
    const iid = req.params.TId;
    const sql = "SELECT Regno,Name from student  where SClassID IN  (SELECT Class_ID FROM class WHERE Class_TeacherID=?) " ;
  
    db.query(sql,[iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
        
       
        
      }
    });
  });

  router.get('/api/attendancedetails/:SId', (req, res) => {
    const sid = req.params.SId;
    const sql = 'SELECT DATE_FORMAT(Attendance_Date, "%Y-%m-%d") AS Date,AstudentID,Name,Status From student,attendance where AstudentId=Regno AND AstudentId=?; ';
  
    db.query(sql,[sid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
        
       
        
      }
    });
  });
  
  router.get('/api/todaysattendance/:TId', (req, res) => {
    const iid = req.params.TId;
    const { date } = req.query;
    const sql = 'SELECT DATE_FORMAT(Attendance_Date, "%Y-%m-%d") AS Date,AstudentID,Name,Status From student,attendance where AstudentId=Regno AND (Attendance_Date=? AND AClassID=(Select Class_ID from class where Class_TeacherID=?)); ';
  
    db.query(sql, [date,iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data retrieval failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
      }
    });
  });
  return router;
};
