var express = require ('express');
var app = express ();
const port = 3000;

app.listen(port, function(){
  console.log('server start at http://localhost:' +port);
  
})
