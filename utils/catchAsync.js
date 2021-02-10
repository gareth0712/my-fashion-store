module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Any error in controller will be caught and thrown to globalerrorhandler
// During the process, closure allows fn to maintain its "value" (i.e. the callback function) inside even tho the catchAsync function has already returned
