const { parseFilters, studies2JSON } = require('../utils/studies');

module.exports = {
  getStudies: (req, res) => {
    const params = req.query;
    const parsedFilters = params ? parseFilters(params) : {};
    // console.log(parsedFilters);
    const { exec } = require('child_process');
    const cmdToExecute = `../dcm4che/bin/dcmqr IMATECSVR@192.168.0.61:11112 ${parsedFilters} -r PatientID -r PatientName -r PatientSex -r PatientBirthDate -r ModalitiesInStudy -r StudyDescription`;
    exec(cmdToExecute, { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`\x1b[34m ${cmdToExecute}  \x1b[37m`);
      res.json(studies2JSON(stdout));
    });
  }
};
