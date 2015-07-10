/**
 * Created by omri on 7/7/15.
 */
var mandrill = require('node-mandrill');

module.exports.mandrill = {

  client: mandrill(process.env.MANDRILL_API_KEY)

}
