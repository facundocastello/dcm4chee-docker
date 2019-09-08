const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  console.log(req.query);
  const params = req.query;
  console.log('accessed');
  const { exec } = require('child_process');
  exec(
    '../dcm4che/bin/dcmqr IMATECSVR@192.168.0.27:11112 -r PatientID -r PatientName -r PatientSex -r PatientBirthDate -r ModalitiesInStudy -r StudyDescription',
    (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }

      // the *entire* stdout and stderr (buffered)
      var studiesChunk = stdout.split('Query Response #');
      studiesChunk.shift();

      const studies = studiesChunk.map(chunk => {
        return chunk.split('\n').filter(line => line[0] == '(');
      });

      const studiesJson = studies.map(study => {
        const studyJson = {};
        study.forEach(studyData => {
          if (studyData.includes('[]')) return;
          const value = studyData.split('[')[1].split(']')[0];
          const key = studyData.split(']')[1].replace(/ |\?|\//g, '');
          studyJson[key] = value;
        });
        return studyJson;
      });
      res.json(studiesJson);
    }
  );
});

module.exports = router;