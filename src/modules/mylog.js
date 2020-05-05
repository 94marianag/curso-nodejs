function info(text) {
  console.log("Info ", text);
  return text;
}

function error(text) {
  console.log("Error ", text);
  return text;
}

module.exports = { info, error };
