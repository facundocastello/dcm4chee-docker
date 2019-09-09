module.exports = {
  studies2JSON: studiesConsole => {
    var studiesChunk = studiesConsole.split('Query Response #');
    studiesChunk.shift();

    const studies = studiesChunk.map(chunk => {
      return chunk.split('\n').filter(line => line[0] == '(');
    });

    const studiesJson = studies.map(study => {
      const studyJson = {};
      study.forEach(studyData => {
        if (studyData.includes('[]')) return;
        const value = studyData.split('[')[1].split(']')[0];
        const key = studyData.split(']')[1].trim();
        studyJson[MAP_ATTRIBUTES[key]] = value;
      });
      return studyJson;
    });
    return studiesJson;
  },
  parseFilters: filters => {
    let filtersParsed = '';
    if (filters.SeriesInstanceUID) {
      filtersParsed += ' -I ';
    } else if (filters.StudyInstanceUID) {
      filtersParsed += ' -S ';
    }
    Object.keys(filters).forEach(key => {
      filtersParsed += `-q${key} ${filters[key]} `;
    });

    return filtersParsed;
  }
};

MAP_ATTRIBUTES = {
  'Instance Number': 'InstanceNumber',
  'Instance Availability': 'InstanceAvailability',
  'Modalities in Study': 'ModalitiesInStudy',
  'Number of Study Related Series': 'NumberofStudyRelatedSeries',
  'Number of Study Related Instances': 'NumberofStudyRelatedInstances',
  'Number of Series Related Instances': 'NumberofSeriesRelatedInstances',
  'Patient?s Name': 'PatientName',
  'Patient ID': 'PatientID',
  'Query/Retrieve Level': 'QueryLevel',
  'Retrieve AE Title': 'RetrieveAETitle',
  'Series Instanc': 'SeriesInstanceUID',
  'SOP Class UID': 'SOPClassUID',
  'SOP Instance U': 'SOPInstanceUID',
  'Specific Character Set': 'SpecificCharacterSet',
  'Study Description': 'StudyDescription',
  'Study Date': 'StudyDate',
  'Study Instance': 'StudyInstanceUID'
};
