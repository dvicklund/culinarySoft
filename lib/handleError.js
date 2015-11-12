module.exports = function(err, res) {
  console.log('Error!\n' + err);
  return res.status(500).json({msg: "Server Error"});
};