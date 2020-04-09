const express=require('express');
var app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyparser.json());

const cors = require('cors')
app.use(cors());
var axios=require('axios');
var accountId = '0002bcb969d9a400000000001';
var applicationKey = 'K000JjkD1Ovc+ec9DSQcYyajD3pVtRs';
var credentials;
var encodedBase64 = new Buffer(accountId + ':' + applicationKey).toString('base64');

var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var bucketId = "e27b4c5b49f649bd791a0410";

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


app.post('/cloudsend', (req, res) => {
   let params = req.body;
   let filePath=params.filePath;
   let fileSize=params.filesize;
//   console.log(params);
              axios.post(params.credentials.apiUrl + '/b2api/v1/b2_get_upload_url',
              {
                 bucketId: bucketId
              },
              { headers: { Authorization: params.credentials.authorizationToken } })
              .then(function (response) {
                console.log(response.data);
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
                           console.log(response); // successful response
                           fs.unlink(filePath, (err) => {
                                if (err) throw err;
                            });

                       }).catch(function (err) {
                           console.log(err); // an error occurred
                       });
               })
              .catch(function (err) {
                 console.log(err); // an error occurred
               });

});
