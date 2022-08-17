const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    sendAndConfirmRawTransaction
} = require("@solana/web3.js")  //the solana js module for devs.

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

console.log(publicKey)  //displays the public key
console.log(secretKey)  //displays the secret key

const getWalletBalance = async() => {                                                  //making a new wallet
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`wallet balance in lamports is ${walletBalance}`)
    } catch(err) {
        console.error(err)
    }

}
const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        const latestBlockHash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: fromAirDropSignature,
        });
    } catch(err) {
        console.log(err)
    }
}

const main = async() => {
        await getWalletBalance()
        await airDropSol()
        await getWalletBalance()
    }
    main()
