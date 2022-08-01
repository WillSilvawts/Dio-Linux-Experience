//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require ('bitcoinjs-lib')

//definir a rede para teste
//se fosse a principal seria .bitcoin - mainnet
const network = bitcoin.networks.testnet

//derivação de carteiras HD
// no lugar do 1 poderia ser 0 se fosse para mainnet
const path = `m/49'/1'/0'/0`

//criando palavras mnemonicas para a seed (senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par de chave privada e publica
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("carteira gerada")
console.log("Endereço:", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed:", mnemonic)