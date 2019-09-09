const { parseFilters, studies2JSON } = require('../utils/studies');

module.exports = {
  getStudies: (req, res) => {
    const params = req.query;
    const parsedFilters = params ? parseFilters(params) : {};
    console.log(parsedFilters);
    const { exec } = require('child_process');
    exec(
      `../dcm4che/bin/dcmqr IMATECSVR@192.168.0.27:11112 ${parsedFilters} -r PatientID -r PatientName -r PatientSex -r PatientBirthDate -r ModalitiesInStudy -r StudyDescription`,
      {maxBuffer: 1024 * 500},
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }

        res.json(studies2JSON(stdout));
      }
    );
  }
};
