const User = require('../models/user.model');
const { checkPassword, createJWT } = require('../helper/auth.help');

async function logUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const check = await checkPassword(password, user);
    if (user && check) {
      const jwToken = createJWT(user);

      res.status(200).json({
        user,
        token: jwToken,
      });
    } else {
      res.status(401).json({ message: 'Invalid user or passwd' });
      return;
    }
  } catch (err) {
    next(err);
  }
}

module.exports = logUser;
