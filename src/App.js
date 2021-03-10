import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setuploadedFile] = useState({});

  const onChange = (e) =>{
    console.log("onchange",e);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }


  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("on submit",e);
    let formData = new FormData();
    formData.append('file', file);

    try {
      let res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })


      console.log("response",res.data);
      let { fileName, filePath } = res.data;
      setuploadedFile({fileName, filePath});
    } catch(err){
      console.log('err', err);
    }

  }

  return (
    <div className="container">
      <h3 className="p-5">problem set: Upload files to Node Server and then convert the file into jpg and show that images to the user!</h3>
      
      <form className="mt-5" onSubmit = {onSubmit} >
        <div className="form-group">
          <div className="d-flex justify-content-center align-items-center">
            <input type="file" className="form-control-file" id="customFile" onChange = {onChange}/>
            <button type="submit" value="upload" className="submit_button btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
      
    </div>
  );
}

export default App;
