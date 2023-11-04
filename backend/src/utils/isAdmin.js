const isAdmin = (req, res, next) => {
  if(req.user.role !== 'admin'){
    return res.sendStatus(403).json({ 
      message: 'You must be an admin to perform this request' 
    });
  }
  next();
}

module.exports = isAdmin;