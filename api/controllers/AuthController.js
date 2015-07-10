/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  login: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password) {
      // todo: Check if can swithch this 401 to custom response
      return res.json(401, {err: 'missingEmailPassword'});
    }

    User.findOne({email: email}, function (err, user) {

      if (err) {
        sails.config.raven.client.captureError(err);
        return res.serverError(err);
      }
      if (!user) {
        return res.json(401, {err: 'invalidEmailPassword'});
      }

      if (!user.isActive) {
        return res.json(401, {err: 'accountNotActive'});
      }

      User.comparePassword(password, user, function (err, valid) {
        if (err) {
          return res.serverError(err);
        }

        if (!valid) {
          return res.json(401, {err: 'invalidEmailPassword'});
        } else {
          return res.ok({
            user: user,
            token: jwToken.issue({id: user.id})
          });
        }
      });
    })
  }
};


