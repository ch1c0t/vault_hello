options =
  token: 's0me-d3v-t0k3n'
  #apiVersion: 'v1' #default
  endpoint: 'http://vault:8200'

vault = require("node-vault")(options)

vault
  .write 'secret/hello',
    value: 'some'
    lease: '1s'
  .then ->
    vault
      .read 'secret/hello'
      .then (result) -> console.log result
  .catch console.error
