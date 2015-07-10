/**
 * Created by omri on 7/7/15.
 */
var raven = require('raven');

var client = new raven.Client(process.env.SENTRY_DSN);

client.captureMessage("Raven up and running!");

//Catch global errors
client.patchGlobal(function(is_err, err) {
  console.error('An unexpected error occurred. Restarting the process: ' + err.stack);
  process.exit(1);
});

module.exports.raven = {

  client: client

}
