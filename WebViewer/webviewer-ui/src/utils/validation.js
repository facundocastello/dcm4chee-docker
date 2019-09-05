import validator from 'validator';

const validate = async (validation, element) => {
  const validations = {};
  const validationKeys = Object.keys(validation);

  for (
    let elementIndex = 0;
    elementIndex < validationKeys.length;
    elementIndex++
  ) {
    const elementKey = validationKeys[elementIndex];
    const validationElement = [];
    const rules = validation[elementKey];
    const rulesArray = rules.split(',');
    for (let ruleIndex = 0; ruleIndex < rulesArray.length; ruleIndex++) {
      const rule = rulesArray[ruleIndex];

      // if (rule.includes('exists')) {
      //   const exists = await validateIfExists(rule, element, elementKey);
      //   if (exists !== true) {
      //     validationElement.push(exists);
      //   }
      // }

      // if (rule.includes('unique')) {
      //   const isUnique = await validateIfIsUnique(rule, element, elementKey);
      //   if (isUnique !== true) {
      //     validationElement.push(isUnique);
      //   }
      // }

      switch (rule) {
        case 'required':
          if (element[elementKey] === undefined)
            validationElement.push("Can't be undefined");
          break;
        case 'notempty':
          if (!element[elementKey] || validator.isEmpty(element[elementKey]))
            validationElement.push("Can't be empty");
          break;
        default:
          break;
      }
    }
    if (validationElement.length) validations[elementKey] = validationElement;
  }

  return Promise.resolve(validations);
};

// const validateIfExists = async (rule, element, elementKey) => {
//   const [, elementType] = rule.split('|');

//   if (!element[elementKey] || element[elementKey] === '') {
//     return true;
//   }
//   const findObject =
//     elementType && elementType !== ''
//       ? { _id: element[elementKey], elementType: elementType }
//       : { _id: element[elementKey] };
//   const result = await db.find({
//     selector: findObject
//   });
//   if (result.docs.length === 0) {
//     return 'Record not found';
//   }
//   return true;
// };

// const validateIfIsUnique = async (rule, element, elementKey) => {
//   const [, elementType] = rule.split('|');

//   if (!element[elementKey] || element[elementKey] === '') {
//     return true;
//   }
//   if (!elementType) return 'Must define element type';

//   const result = await db.find({
//     selector: { [elementKey]: element[elementKey], elementType: elementType }
//   });
//   if (result.docs.length > 0) {
//     return 'Record already exists';
//   }
//   return true;
// };

export default validate;
