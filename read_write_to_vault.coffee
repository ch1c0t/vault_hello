vault = require("node-vault")(token: "s0me-d3v-t0k3n")

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
