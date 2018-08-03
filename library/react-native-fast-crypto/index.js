import { NativeModules } from 'react-native'
import { base16, base64 } from 'rfc4648'

const { RNFastCrypto } = NativeModules
const Buffer = require('buffer').Buffer
var utils = require('./utils');

function getUTF8Bytes(password) {
  if (typeof(password) === 'string') {
      return utils.toUtf8Bytes(password, 'NFKC');
  }
  return utils.arrayify(password, 'password');
}

export async function scrypt (passwd, salt, N, r, p, size) {
  console.log('scrypt : ' + passwd + ' : ' + salt);

  const byPasswd = passwd;//getUTF8Bytes(passwd);//base32.parse("NV4XAYLTON3W64TE")
  const bysalt = salt;//getUTF8Bytes(salt);//base32.parse("NV4XGYLMOQ======")
  // console.log(' *********************** ');
  // console.log(byPasswd);
  // console.log(bysalt);

  passwd = base64.stringify(byPasswd)
  salt = base64.stringify(bysalt)
  // console.log('passwd: ' + passwd)
  // console.log('salt: ' + salt)

  //console.log('RNFS:scrypt(' + N.toString() + ', ' + r.toString() + ', ' + p.toString())
  // console.log('RNFS:script start')
  const t = Date.now()
  const retval:string = await RNFastCrypto.scrypt(passwd, salt, N, r, p, size)
  const elapsed = Date.now() - t
  // console.log('RNFS:script finished in ' + elapsed + 'ms')

  let uint8array = base64.parse(retval)
  return uint8array.subarray(0, size)
}

async function publicKeyCreate (privateKey: Uint8Array, compressed: boolean) {
  const privateKeyHex = base16.stringify(privateKey)
  const publicKeyHex: string = await RNFastCrypto.secp256k1EcPubkeyCreate(privateKeyHex, compressed)
  const outBuf = base16.parse(publicKeyHex, { out: Buffer.allocUnsafe })
  return outBuf
}

async function privateKeyTweakAdd (privateKey: Uint8Array, tweak: Uint8Array) {
  const privateKeyHex = base16.stringify(privateKey)
  const tweakHex = base16.stringify(tweak)
  const privateKeyTweakedHex: string = await RNFastCrypto.secp256k1EcPrivkeyTweakAdd(privateKeyHex, tweakHex)
  const outBuf = base16.parse(privateKeyTweakedHex, { out: Buffer.allocUnsafe })
  return outBuf
}

async function publicKeyTweakAdd (publicKey: Uint8Array, tweak: Uint8Array, compressed: boolean) {
  const publicKeyHex = base16.stringify(publicKey)
  const tweakHex = base16.stringify(tweak)
  const publickKeyTweakedHex: string = await RNFastCrypto.secp256k1EcPubkeyTweakAdd(publicKeyHex, tweakHex, compressed)
  const outBuf = base16.parse(publickKeyTweakedHex, { out: Buffer.allocUnsafe })
  return outBuf
}

async function pbkdf2DeriveAsync(key: Uint8Array, salt: Uint8Array, iter: number, len: number, alg: string) {
  if (alg !== 'sha512') {
    throw new Error('ErrorUnsupportedPbkdf2Algorithm: ' + alg)
  }
  const keyHex = base16.stringify(key)
  const saltHex = base16.stringify(salt)
  const resultHex = await RNFastCrypto.pbkdf2Sha512(keyHex, saltHex, iter, len)
  const outBuf = base16.parse(resultHex, { out: Buffer.allocUnsafe })
  return outBuf
}

export const secp256k1 = {
  publicKeyCreate,
  privateKeyTweakAdd,
  publicKeyTweakAdd
}

export const pbkdf2 = {
  deriveAsync: pbkdf2DeriveAsync
}

// Deprecated. Use the named exports instead:
export default {
  scrypt,
  secp256k1,
  pbkdf2
}
