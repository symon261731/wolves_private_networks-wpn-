function authCheck(req, res, next) {
  if (req.session?.user) {
    next();
  } else {
    console.log("wtf")
    res.status(401).json({ message: 'You\'re not authorized. Please login.' });

  }
}

module.exports = authCheck;
