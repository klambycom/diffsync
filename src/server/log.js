module.exports = function (id) {
  return function (text, error = false) {
    let message = `${new Date()} ${text} (${id})`;

    if (error) {
      console.error(message);
    } else {
      console.log(message);
    }
  };
};
