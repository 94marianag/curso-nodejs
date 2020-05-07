const jwt = require('jsonwebtoken');

const isValidHostname = (req, res, next) => {
  const validHosts = ['localhost'];
  if (validHosts.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({ status: 'Acces_Denied' });
  }
};

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.sessionData = { userId: data.userId, role: data.role };
      next();
    } else {
      throw {
        code: 403,
        status: 'Acces_Denied',
        message: 'Missing header token',
      };
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: error.status || 'Error', message: error.message });
  }
  //   if (req.hostname === 'localhost') {
  //     next();
  //   } else {
  //     res.status(403).send({ status: 'Acces_Denied' });
  //   }
  //   console.log(req.hostname);
};

const isAdmin = (req, res, next) => {
  try {
    const { role } = req.sessionData;
    console.log(role);
    if (role !== 'admin') {
      throw {
        code: 403,
        status: 'Acces_Denied',
        message: 'Invalid Role',
      };
    } else {
      next();
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: error.status || 'Error', message: error.message });
  }
};

module.exports = { isValidHostname, isAuth, isAdmin };
