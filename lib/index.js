// Generated by CoffeeScript 2.0.2
(function() {
  var Key, encrypted_token, endpoint, fs, http, key, options, start_http_server, token, vault;

  fs = require('fs');

  Key = require('./key');

  key = new Key(fs.readFileSync('/tmp/vault/key'));

  encrypted_token = fs.readFileSync('/tmp/vault/token').toString();

  token = key.decrypt(encrypted_token);

  endpoint = fs.readFileSync('/tmp/vault/endpoint').toString().trim();

  options = {
    token: token,
    endpoint: endpoint
  };

  vault = require("node-vault")(options);

  vault.write('secret/hello', {
    value: 'some',
    lease: '1s'
  }).then(function() {
    return vault.read('secret/hello').then(function(result) {
      console.log(result);
      return start_http_server(result);
    });
  }).catch(console.error);

  http = require('http');

  start_http_server = function(result) {
    return http.createServer(function(request, response) {
      return response.end(JSON.stringify(result, false, 2));
    }).listen(3000, function(error) {
      if (error) {
        return console.log(error);
      } else {
        return console.log("Server is listening at 3000.");
      }
    });
  };

}).call(this);
