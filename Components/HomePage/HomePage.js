import React, { Component,authenticate } from 'react';
import axios from 'axios';
import data1 from '../Data/resume1doc.json';

class HomePage extends Component{

  constructor(props) {
       super(props);
       this.onSubmit = this.onSubmit.bind(this);
       this.file_change = this.file_change.bind(this);
       this.state = {
           file_location: '',
           credentials: ''
       }
   }
getresume(){
  axios.get('http://localhost:3000/resdata')
        .then(res => {
          console.log("resumedb",res.data);
        })

  axios.get("http://localhost:5000/cloudauth")
  .then(res => {
    this.setState({credentials:res.data });
    console.log("cloud",res.data);
  })

}
   componentDidMount(){
      this.getresume();
      $('#table_id').DataTable({
  dom: 'Bfrtip',
  buttons: [
    'copyHtml5',
               'excelHtml5',
               'csvHtml5',
               'pdfHtml5'
  ]
});
   }

   file_change(e){
       this.setState({file_location:e.target.value });

   }

   onSubmit(e){
     e.preventDefault();
     console.log(this.state.file_location);
     console.log(  $('#file').value);
     const fileupdata = {
       credentials:this.state.credentials,
       filePath:this.state.file_location
     }
     axios.post("http://localhost:5000/cloudsend",fileupdata)
   	  .then(res => console.log(res.data));

  //    const resume = {
	//       name:"",
  //       email:"",
  //       phone:"",
  //       linkedin:"",
  //       no_images:2,
  //       no_text_lines:3,
  //       no_text_characters:4,
  //       font_family:"",
  //       font_size:3,
  //       no_tables:4
	// }
  // axios.post('http://localhost:3000/resdata', resume)
	// .then(res => console.log(res.data));

}

   render(){
      return(
         <div>
            <h1 className="text-center">Resume Parser</h1>
            <div className="row justify-content-center">
                  <form className="form-horizontal border border-secondary col-md-4 col-md-offset-4" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="control-label" htmlFor="file">Select The Resume:</label>
                        <div className="col-sm-10">
                          <input type="file" id="file" onChange={this.file_change} className="form-control" accept=".pdf,.doc,.docx" required id="file"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button type="submit" className="btn btn-success">Submit</button>
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
                          data1.map((row,i)=>{
                              return(<tr key={i}>
                                  <td>{row.general_info.name}</td>
                                  <td>{row.general_info.email}</td>
                                  <td>{row.general_info.mobile}</td>
                                  <td>{row.general_info.linkedin}</td>
                                  <td>Row 1 Data 2</td>
                                  <td>Row 1 Data 2</td>
                                  <td>Row 1 Data 2</td>
                                  <td>Row 1 Data 2</td>
                                  <td>Row 1 Data 2</td>
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
