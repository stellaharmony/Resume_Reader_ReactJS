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
connection.connect((err)=>{
  if(!err)
  {
    console.log("Connection Established");
  }else{
    console.log("Connection Failed");
  }
});
app.listen(3000,()=>{
  console.log("Express Started at port 3000");
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
   let params = req.body.resume;
    var sql = "insert into resume_data(name,email,phone,linkedin,no_images,no_text_lines,no_text_characters,font_family,font_size,no_tables)values(?,?,?,?,?,?,?,?,?,?)";
    connection.query(sql, [params.name,params.email, params.phone, params.linkedin, params.no_images,params.no_text_lines,params.no_text_characters,params.font_family,params.font_size,params.no_tables], (err, rows, fields) => {
        if (!err)
        console.log("Inserted");
        else
            console.log(err);
    })

});

//
// //get all movies data
// app.get('/movies',(res,req)=>{
//   connection.query("select * from movies_data",(err,rows,fields)=>{
//     if(!err)
//     {
//       req.send(rows);
//     }else{
//       console.log(err);
//     }
//   });
// });
//
// //Get a movie data
// app.get('/movies/:id', (req, res) => {
//     connection.query('SELECT * FROM movies_data WHERE movie_name = ?', [req.params.id], (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });
//
// //Delete an movie
// app.delete('/movies/:id', (req, res) => {
//     mysqlConnection.query('DELETE FROM movies_data WHERE movie_name = ?', [req.params.id], (err, rows, fields) => {
//         if (!err)
//             res.send('Deleted successfully.');
//         else
//             console.log(err);
//     })
// });
//
// //Insert a movie
// app.post('/movies', (req, res) => {
//    let params = req.body.movie;
//     var sql = "insert into movies_data(movie_name,year_of_release,plot,poster,casting)values(?,?,?,?,?)";
//     connection.query(sql, [params.movie_name,params.year_of_release, params.plot, params.poster, params.cast], (err, rows, fields) => {
//         if (!err)
//         console.log("Inserted");
//         else
//             console.log(err);
//     })
//
// });
//
// //Update an movie
// app.put('/movies', (req, res) => {
//     let params = req.body;
//     var sql = "update movies_data set year_of_release=?,plot=?,poster=?,casting=? where movie_name=?";
//     mysqlConnection.query(sql, [params.year_of_release, params.plot, params.poster, params.casting], (err, rows, fields) => {
//         if (!err)
//             res.send('Updated successfully');
//         else
//             console.log(err);
//     })
// });
//
//
//
// //get all actors data
// app.get('/actors',(res,req)=>{
//   connection.query("select * from actors_data",(err,rows,fields)=>{
//     if(!err)
//     {
//       req.send(rows);
//     }else{
//       console.log(err);
//     }
//   });
// });
//
// //Get a movie data
// app.get('/actors/:id', (req, res) => {
//     connection.query('SELECT * FROM actors_data WHERE actor_name = ?', [req.params.id], (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });
//
// //Delete an movie
// app.delete('/actors/:id', (req, res) => {
//     mysqlConnection.query('DELETE FROM actors_data WHERE actor_name = ?', [req.params.id], (err, rows, fields) => {
//         if (!err)
//             res.send('Deleted successfully.');
//         else
//             console.log(err);
//     })
// });
//
// //Insert a movie
// app.post('/actors', (req, res) => {
//    let params = req.body.actor;
//     var sql = "insert into actors_data(actor_name,gender,dob,bio)values(?,?,?,?)";
//     connection.query(sql, [params.actor_name,params.gender,params.dob,params.bio], (err, rows, fields) => {
//         if (!err)
//         console.log("Inserted");
//         else
//             console.log(err);
//     })
//
// });
//
// //Update an employees
// app.put('/actors', (req, res) => {
//     let params = req.body;
//     var sql = "update actors_data set dob=?,bio=? where actor_name=?";
//     mysqlConnection.query(sql, [params.dob,params.bio], (err, rows, fields) => {
//         if (!err)
//             res.send('Updated successfully');
//         else
//             console.log(err);
//     })
// });
