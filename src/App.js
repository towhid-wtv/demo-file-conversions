import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setuploadedFile] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [redirectUrl, setRedirectUrl] = useState('No url');
  const [fileConvesionStatus, setFileConvesionStatus] = useState('');

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
      let webcastId = '1410-1948-27854'


      // Send a POST request
      let res = await axios({
        method: 'post',
        url: 'http://localhost:5000/convertToJpg',
        params: {
          webcastId
        },
        data: formData,
        headers: {
          'Content-Type' : 'multipart/form-data'
        },
        onUploadProgress: (ProgressEvent) => {
          console.log('ProgressEvent',ProgressEvent);
          let {loaded, total} = ProgressEvent;
          let percentageOfUPload = parseInt(Math.round(loaded * 100)/total);
          console.log('progress Event percentage', percentageOfUPload);
          setUploadProgress(percentageOfUPload);
          if(percentageOfUPload === 100){
            setFileConvesionStatus("Converting your files into jpg");
          }
        }
      });

      // let res = await axios.post(`http://localhost:5000/upload`, formData, {
      //   headers: {
      //     'Content-Type' : 'multipart/form-data'
      //   },
      //   onUploadProgress: (ProgressEvent) => {
      //     console.log('ProgressEvent',ProgressEvent);
      //     let {loaded, total} = ProgressEvent;
      //     let percentageOfUPload = parseInt(Math.round(loaded * 100)/total);
      //     console.log('progress Event percentage', percentageOfUPload);
      //     setUploadProgress(percentageOfUPload);
      //     if(percentageOfUPload === 100){
      //       setFileConvesionStatus("Converting your files into jpg");
      //     }
      //   }
      // });



      if(res.data.msg !== 'No file chosen.'){
        console.log("response",res.data);
        let _redirectUrl = res.data.redirectUrl;
        console.log(_redirectUrl);
        // http://localhost:5000?fileName=nobotchat flyer.pdf&numOfPages=4
        setRedirectUrl(_redirectUrl);
        setFileConvesionStatus("conversion success");
       
      }else{
        console.log("no file chosen")
      }

    } catch(err){
      console.log('err', err);
    }

  }

  return (
    <div className="container">
      <h3 className="p-5">problem set: Upload files to Node Server and then convert the file into jpg and show that images to the user!</h3>
      <div> UploadStatus: {uploadProgress}% {fileConvesionStatus} </div>
      <div><button className="see-images" onClick = {()=>{
        console.log("test url", redirectUrl);
        window.open(redirectUrl)
      }}>{redirectUrl}</button></div>
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
