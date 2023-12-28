const express=require('express')
const router=express.Router()


module.exports=(db)=>{
  router.post('/api/addstudent/:IId', (req, res) => {
    const Regno = req.body.Regno;
    const Name = req.body.Name;
    const Dob = req.body.Dob;
    const Fname = req.body.Fname;
    const Mname = req.body.Mname;
    const Address=req.body.Address;
    const classname=req.body.classname;


    const iid = req.params.IId;
  
    const sql = 'INSERT INTO student (Regno, Name, StudentDOB, Father_name, Mother_name,Address,SInstituteID,SClassID) VALUES (?, ?, ?, ?, ?,?,?,?)';
  
    db.query(sql, [Regno, Name, Dob, Fname, Mname,Address,iid,classname], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data inserted successfully');
        res.json({ message: 'Data inserted successfully2', result });
       
        
        
      }
    });
  });

  return router;

}

