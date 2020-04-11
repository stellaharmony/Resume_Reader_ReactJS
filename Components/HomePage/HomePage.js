import React, { Component,authenticate } from 'react';
import axios from 'axios';
import data1 from '../Data/resume1doc.json';
import "../HomePage/HomePage.css";
class HomePage extends Component{

  constructor(props) {
       super(props);

       this.onSubmit = this.onSubmit.bind(this);
       this.file_change = this.file_change.bind(this);
       this.state = {
           file_location: '',
           credentials: '',
           resdata:[],
           loading:false
       }
   }
getresume(){
  axios.get('http://localhost:3000/resdata')
        .then(res => {
        this.setState({resdata:res.data});
        })
}

getauth(){
  axios.get("http://localhost:5000/cloudauth")
  .then(res => {
    this.setState({credentials:res.data });
    console.log("cloud",res.data);
  })
}
componentDidUpdate(){
  this.getresume();
}

   componentDidMount(){
      this.getresume();
      this.getauth();
      setTimeout(function(){
        $('#table_id').DataTable({
        dom: 'Bfrtip',
        destroy:true,
        responsive: true,
        buttons: [
          'copyHtml5',
          'excelHtml5',
          'csvHtml5',
          'pdfHtml5'
          ]
        });
    }, 300);
   }

   file_change(e){
       this.setState({file_location:e.target.files[0]});
   }

   onSubmit(e){
     e.preventDefault();
//     this.setState({loading:true});
    $("#spinner").show();
//Save The Uploaded File In Local Folder
     const data = new FormData()
     data.append('file', this.state.file_location)
     axios.post("http://localhost:5000/", data, {
      })
      .then(res => {
        console.log(res.statusText)
      })
      .catch(function (err) {
          console.log(err);
          $('#spinner').hide();
          $('#failure').show();

      });

//Upload The Stored File on Cloud
    let filePath="./uploads/"+this.state.file_location.name;
    let filesize=this.state.file_location.size;
     const fileupdata = {
       credentials:this.state.credentials,
       filePath:filePath,
       filesize:filesize
     }
     axios.post("http://localhost:5000/cloudsend",fileupdata)
   	 .then(res => console.log(res.data))
     .catch(function (err) {
         console.log(err);
         $('#spinner').hide();
         $('#failure').show();

     });

//Request the JSON Parsed Data From the Uploaded Resume File
let bucketname="brainchangeacademy";
let downloadurl=this.state.credentials.downloadUrl+"/file/"+bucketname+"/"+this.state.file_location.name;
let filedownlink = {
  downlodingurl:downloadurl
}
axios.post("http://localhost:5000/resumejsondata",filedownlink)
 .then(res =>
{
//  this.setState({resjsondata:res.data })
  let param=res.data;

//  Save the Received Data In MYSQL Database
     const resume = {
        name:param.parsed.general_info.name,
        email:param.parsed.general_info.email,
        phone:param.parsed.general_info.mobile,
        linkedin:param.parsed.general_info.linkedin,
        no_images:param.text.photo_b64.length,
        no_text_lines:3,
        no_text_characters:4,
        font_family:"Anyfont",
        font_size:3,
        no_tables:4
  }
  axios.post('http://localhost:3000/resdata', resume)
  .then(res =>{
    $('#spinner').hide();
    $('#success').show();
  })
  .catch(function (err) {
      console.log(err);
      $('#spinner').hide();
      $('#failure').show();

  });
}).catch(function (err) {
    console.log(err);
    $('#spinner').hide();
    $('#failure').show();

});
// this.setState({loading:false});
}

   render(){
     let info='';


      return(
         <div>
            <h1 className="text-center">Resume Parser</h1>
            <div className="row justify-content-center">
                  <form className="form-horizontal border border-secondary col-md-4 col-md-offset-4" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="control-label" htmlFor="file">Select The Resume:</label>
                        <div className="col-sm-10">
                          <input type="file" name="file" onChange={this.file_change} className="form-control" accept=".pdf,.doc,.docx,.txt" required id="file"/>
                          <span className="text-success" id="success">Data Uploaded Successfully</span>
                          <span className="text-danger" id="failure">Server Error Occured</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-9">
                          <button type="submit" className="btn btn-success">Submit</button>
                            <div id="spinner">
                            <img className="loading" id="loading" src="./Components/Data/loading.gif" />
                            </div>
                        </div>
                      </div>
                 </form>
                 </div>
                 <div className="container">
                       <table id="table_id" className="display table table-bordered">
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Phone Number</th>
                                  <th>LinkedIn Profile</th>
                                  <th>Number of Images</th>
                                  <th>Total No. of Text Lines</th>
                                  <th>Total No. of Text characters </th>
                                  <th>Font Family & Font Size</th>
                                  <th>Number of Tables</th>
                              </tr>
                          </thead>
                          <tbody>{
                        this.state.resdata.map((row,i)=>{
                              return(<tr key={i}>
                                  <td>{row.name}</td>
                                  <td>{row.email}</td>
                                  <td>{row.phone}</td>
                                  <td>{row.linkedin}</td>
                                  <td>{row.no_images}</td>
                                  <td>{row.no_text_lines}</td>
                                  <td>{row.no_text_characters}</td>
                                  <td>{row.font_family}{row.font_size}</td>
                                  <td>{row.no_tables}</td>
                              </tr>)
                            })}
                          </tbody>
                      </table>
                 </div>
         </div>
      );
   }
}
export default HomePage;
