module.exports = function (id) {
  return function (text, error = false) {
    console.log(`${new Date()} ${text} (${id})`);
  };
};
