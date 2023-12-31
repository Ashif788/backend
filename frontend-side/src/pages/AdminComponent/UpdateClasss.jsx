import React, { useState ,useEffect} from 'react';
import { useParams} from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import "./Admin.css"

function UpdateClasss()  {
  const {IId}=useParams()

  const {CId}=useParams()
  const inputValues = { classid:"",classname: '' ,teachername:''};
  const [formData, setForm] = useState(inputValues);
  
  const errorValues = {  classid:"" ,classname: '',teachername:'' };
  const [errorData, setError] = useState(errorValues);
  
  
  
  const [data, setData] = useState([]);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  
    
  
  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent('');
  };
  

  useEffect(() => {
    Axios.get(`http://localhost:3003/api/updateclassdetails/${CId}/`)
      .then(result => {
        setForm(prevFormdata => ({
          ...prevFormdata,
          classid: result.data[0].Class_ID,
          classname: result.data[0].Class_Name,
          teachername: result.data[0].StudentDOB,

        }));
        console.log(result.data[0])
        
        
        
      })
      .catch(error => {
        console.error(error);
        alert('Error');
      });
  }, [CId]);
  
  
  useEffect(() => {
    Axios.get(`http://localhost:3003/api/teacherdetail/${IId}`)
      .then(result => {
        setData(result.data);
        if(!result.data.length){
          errorData.teachername="Add Teacher First"
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error');
      });
  }, [IId]);
  
  const InputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });
    console.log(formData.teachername)
  };
  
  const HandleSubmit = (e) => {
    e.preventDefault();
    const newError = {};
  
    if (!formData.classid) {
      newError.classid= '*Enter the Class-ID*';
    }
    if (formData.classid.length>4) {
      newError.classid= '*ClassID Should Less Than 4*';
    }
    if (!formData.classname) {
      newError.classname= '*Enter the Class-Name*';
    }
    if (formData.classname.length>10) {
      newError.classname= '*Only 10 character Valid*';
    }
    if(!formData.teachername){
      newError.teachername= '*Select the Teacher*';
    }
  
    setError(newError);
  
    if (Object.keys(newError).length === 0) {
      Axios.put(`http://localhost:3003/api/updateclass/${IId}/${CId}`, {
      ClassID:formData.classid,
      Classname:formData.classname,
      Teachername:formData.teachername,
      
  
  
      
      })
      .then((response) => {
        
        if (response.data.message === 'Data updated successfully') {
          openModal('Class Updated Successfully');
          
        } if (response.data.message === 'Data updated failed'){
          openModal('ClassID Already Exist');
        }
      })
      .catch((error) => {
        openModal('Something went wrong');
      });
    }
  };
  
  return (
  <div>
  <div className='Details'>
  <div className='Add-box'>
  
    <form onSubmit={HandleSubmit}>
   
      <h3>Update Class</h3>
      <input
        type="text"
        name="classid"
        placeholder="Class-ID"
        value={formData.classid}
        onChange={InputChange}
      />
      <br />
      <p className="error">{errorData.classid}</p>
  
      <input
        type="text"
        name="classname"
        placeholder="Class-Name"
        value={formData.classname}
        onChange={InputChange}
      />
      <br />
      <p className="error">{errorData.classname}</p>
  <div className='Select-box'>
    <label> Teacher  :</label>
      <select  name="teachername" 
              id="teachername"
              className='select-option'
              onChange={InputChange}
      >
        <option>Select Teacher</option>
        {
          data.map(getdata=>{
            return <option value={getdata.TeacherID}>{getdata.Name}</option>
          })
        }
  
      </select>

      

      </div>
      <p className="error">{errorData.teachername}</p>

     
  
     
      <div className='Addbutton-box'>
      <button type="submit">Update</button>
      </div>
    </form>
    </div>
  </div>
  
  
  <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Error Modal"
          className='ModelBox'>
          <p>{modalContent}</p>
          <button className="Model-Button" onClick={closeModal}>OK</button>
        </Modal>
       
  </div>
  );
  }
  
export default UpdateClasss