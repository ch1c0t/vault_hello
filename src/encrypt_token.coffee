fs = require 'fs'

token = process.argv[2]
path = process.argv[3]

Key = require './key'
key = new Key fs.readFileSync '/tmp/vault/key'

encrypted_token = key.encrypt token
fs.writeFileSync path, encrypted_token
