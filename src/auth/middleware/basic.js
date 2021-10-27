'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return next('No authorization header'); }

  let basic = req.headers.authorization;
  let encodedUserPass = basic.split(' ')[1];
  let decodedUserPass = base64.decode(encodedUserPass);
  let [username, pass] = decodedUserPass.split(':');

  try {
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

};
