fs = require 'fs'

Key = require './key'
key = new Key fs.readFileSync '/tmp/vault/key'
encrypted_token = fs.readFileSync('/tmp/vault/token').toString()
token = key.decrypt encrypted_token

options =
  token: token
  endpoint: fs.readFileSync('/tmp/vault/address').toString().trim()

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
