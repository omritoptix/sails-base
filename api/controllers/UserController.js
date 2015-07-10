/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {

    if (req.body.password !== req.body.confirmPassword) {
      return res.badRequest({err:'mismatchedPasswords'});
    }

    User.create(req.body).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfully we return the user in the response
      if (user) {
        // TODO: Send confirmation email
        // TODO: What if user receiving the email is not the real user?
        // NOTE: payload is { id: user.id}
        res.ok({user: user});
      }
    });
  }
};

