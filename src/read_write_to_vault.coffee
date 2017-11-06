options =
  token: 's0me-d3v-t0k3n'
  #apiVersion: 'v1' #default
  #endpoint: 'http://127.0.0.1:8200' #default

vault = require("node-vault")(options)

vault
  .write 'secret/hello',
    value: 'some'
    lease: '1s'
  .then ->
    vault
      .read 'secret/hello'
      .then (result) -> console.log result
  .then ->
    console.log vault.delete 'secret/hello'
  .catch console.error
