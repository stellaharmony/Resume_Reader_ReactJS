const mysql=require('mysql');
const express=require('express');
var app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());
const cors = require('cors');
app.use(cors());

var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'brainchange'
});

app.listen(3000,()=>{
  console.log("Express Started at port 3000");
});


connection.connect((err)=>{
  if(!err)
  {
    console.log("Connection Established");
  }else{
    console.log("Connection Failed");
  }
});

//get resume data
app.get('/resdata',(res,req)=>{
  connection.query("select * from resume_data",(err,rows,fields)=>{
    if(!err)
    {
      req.send(rows);
    }else{
      console.log(err);
    }
  });
});

//insert resume data
app.post('/resdata', (req, res) => {
   let params = req.body;
    var sql = "insert into resume_data(name,email,phone,linkedin,no_images,no_text_lines,no_text_characters,font_family,font_size,no_tables)values(?,?,?,?,?,?,?,?,?,?)";
    connection.query(sql, [params.name,params.email, params.phone, params.linkedin, params.no_images,params.no_text_lines,params.no_text_characters,params.font_family,params.font_size,params.no_tables], (err, rows, fields) => {
        if (!err)
        console.log("Inserted");
        else
            console.log(err);
    })
});
