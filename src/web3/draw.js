import {LuckyDraw} from "@/configure/bpos";

const validatorsAddress="0x000000000000000000000000000000000000f000"
const proposalAddress="0x000000000000000000000000000000000000f002"
const drawAddress="0xEf40a847Aa593F47DCEDfD797440ea107Aea47AD"


//抽奖
export async function luckyDraw(wallet,dst,details, callback) {
    const contract = new wallet.web3.eth.Contract(LuckyDraw.abi, drawAddress)

    function _luckyDraw(web3,contract,address, callback) {
        return new Promise((resolve, reject) => {
            contract.methods.luckyDraw().send({from: address}).on('transactionHash', function (hash) {
                console.log(hash)
                callback({
                    message: hash,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success'
                    },
                    hash
                });
            }).on('receipt', function (receipt) {
                console.log(receipt);
                resolve(receipt)
            }).on('error', function (error) {
                console.log(error)
                reject(error)
            }).catch((error) => {
                console.log(error)
                reject(error)
            })
        })
    }

    return  _luckyDraw(wallet.web3,contract, wallet.address, callback)
}


//获取参与人数
export async function getAddress(wallet) {
    const contract = new wallet.web3.eth.Contract(LuckyDraw.abi, drawAddress)
    return contract.methods.getAddress().call({from: wallet.address})
}

//获取本人信息
export async function prizes(wallet,address) {
    const contract = new wallet.web3.eth.Contract(LuckyDraw.abi, drawAddress)
    return contract.methods.prizes(address).call({from: wallet.address})
}

