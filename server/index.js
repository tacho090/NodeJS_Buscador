const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;

app.get('/',(req, res) =>{
  dataPath = __dirname + path.join("../../public/data.json");
  fs.readFile(dataPath, 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.send(obj)
  });

});

app.listen(port, ()=>{
  console.log('Listening on port 3000...');
});

// const server = http.createServer((req, res) => {
//   if(req.url === '/'){
//     res.write('Hello');
//     res.end();
//   }else if (req.url === '/api/data')  {
//     res.write(JSON.stringify([1,2,3]));
//     res.end();
//   }
// });//event emitter
