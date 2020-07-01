module.exports = function GenerateUniqueID() {
  return Math.abs(
    Math.floor(Date.now() / (Math.random() * (1000000 - 9999999) + 1000000))
  );
};
