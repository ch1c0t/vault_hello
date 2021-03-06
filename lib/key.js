// Generated by CoffeeScript 2.0.2
(function() {
  var IV_LENGTH, Key, crypto;

  crypto = require('crypto');

  IV_LENGTH = 16;

  Key = class Key {
    constructor(key) {
      this.key = key;
    }

    encrypt(string) {
      var cipher, encrypted, iv;
      iv = crypto.randomBytes(IV_LENGTH);
      cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(this.key), iv);
      encrypted = cipher.update(string);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    decrypt(string) {
      var decipher, decrypted, encryptedText, iv, textParts;
      textParts = string.split(':');
      iv = new Buffer(textParts.shift(), 'hex');
      encryptedText = new Buffer(textParts.join(':'), 'hex');
      decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(this.key), iv);
      decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    }

  };

  module.exports = Key;

}).call(this);
