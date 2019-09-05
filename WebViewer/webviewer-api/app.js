var express = require('express');
var app = express();

app.get('/', function(req, res) {
  const { exec } = require('child_process');
  exec('../dcm4che/bin/dcmqr IMATECSVR@192.168.0.27:11112', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
