'use strict'
const express=require('express');
var app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
const cors = require('cors')
app.use(cors());
var axios=require('axios');
require('dotenv').config();


var accountId = process.env.CLOUD_ACCOUNTID;
var applicationKey = process.env.CLOUD_APPLICATIONKEY;
var credentials;
var encodedBase64 = new Buffer(accountId + ':' + applicationKey).toString('base64');

var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var bucketId = process.env.CLOUD_BUCKETID;

const multer = require('multer');
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname )
    }
})
var upload = multer({ storage: storage }).single('file')

app.listen(5000,()=>{
  console.log("File Server Started at port 5000");
});

//Get Resume Parsed Data In JSON Format
const getresumejson=async url=>{
  const response=await axios.get(url);
  return (response.data)
}


app.post('/resumejsondata', (req, res) => {
let params = req.body;
let url=process.env.API_QUERY_URL+"&fl="+params.downlodingurl+"&l=en";
getresumejson(url).then(function(result) {
   console.log(result);
   setTimeout(function(){res.send(result);}, 60000);
})
});

//Load the Resume in Local Storage Folder
app.post('/',function(req, res) {

    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});



//Authenticate the Cloud Storage Credentials
// const authenticatecloud=async url=>{
//   const response=await axios.post(url);
//   return (response.data)
// }

app.get('/cloudauth',(res,req)=>{
              axios.post("https://api.backblazeb2.com/b2api/v2/b2_authorize_account",{},
              {
                  headers: {Authorization: 'Basic ' + encodedBase64}
              })
              .then(function (response) {
                  var data = response.data
                  credentials = {
                      accountId: accountId,
                      applicationKey: applicationKey,
                      apiUrl: data.apiUrl,
                      authorizationToken: data.authorizationToken,
                      downloadUrl: data.downloadUrl,
                      recommendedPartSize: data.recommendedPartSize
                  }
                   req.send(credentials);
              })
              .catch(function (err) {
                  console.log(err);
              });
});



//Send the Resume from local storage to cloud
app.post('/cloudsend', (req, res) => {
   let params = req.body;
   let filePath=params.filePath;
   let fileSize=params.filesize;
              axios.post(params.credentials.apiUrl + '/b2api/v1/b2_get_upload_url',
              {
                 bucketId: bucketId
              },
              { headers: { Authorization: params.credentials.authorizationToken } })
              .then(function (response) {
                       var uploadUrl = response.data.uploadUrl;
                       var uploadAuthorizationToken = response.data.authorizationToken;
                       var source = fs.readFileSync(filePath)
                       var fileName = path.basename(filePath)
                       var sha1 = crypto.createHash('sha1').update(source).digest("hex");
                       axios.post(
                           uploadUrl,
                           source,
                           {
                               headers: {
                                   Authorization: uploadAuthorizationToken,
                                   "X-Bz-File-Name": fileName,
                                   "Content-Type": "b2/x-auto",
                                   "Content-Length": fileSize,
                                   "X-Bz-Content-Sha1": sha1,
                                   "X-Bz-Info-Author": "unknown"
                               }
                           }
                       ).then(function (response) {
                           fs.unlink(filePath, (err) => {
                                if (err) throw err;
                            });
                           res.send(response.data);

                       }).catch(function (err) {
                           console.log(err);
                       });
               })
              .catch(function (err) {
                 console.log(err);
               });

});
