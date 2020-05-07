const info = (text) => {
  console.log('Info ', text);
  return text;
};

const error = (text) => {
  console.log('Error ', text);
  return text;
};

module.exports.info = info;
module.exports.error = error;
