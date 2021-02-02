import {Proposal,Validators} from "@/configure/bpos";

const validatorsAddress="0x000000000000000000000000000000000000f000"
const proposalAddress="0x000000000000000000000000000000000000f002"

export async function createProposal(wallet,dst,details, callback) {
    const contract = new wallet.web3.eth.Contract(Proposal.abi, proposalAddress)

    function _createProposal(web3,contract,dst,details, address, callback) {
        return new Promise((resolve, reject) => {
            contract.methods.createProposal(dst,details).send({from: address}).on('transactionHash', function (hash) {
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

    return  _createProposal(wallet.web3,contract, dst,details, wallet.address, callback)
}

//获取在某个验证人的质押情况
export async function proposals(wallet,proposalsID) {
    const contract = new wallet.web3.eth.Contract(Proposal.abi, proposalAddress)
    return contract.methods.proposals(proposalsID).call({from: wallet.address})
}

//给验证人合约投票
export async function voteProposal(wallet,id,auth, callback) {
    const contract = new wallet.web3.eth.Contract(Proposal.abi, proposalAddress)

    function _voteProposal(web3, contract, id, auth, address, callback) {
        return new Promise((resolve, reject) => {
            contract.methods.voteProposal(id,auth).send({from: address}).on('transactionHash', function (hash) {
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
                resolve(receipt)
            }).on('error', function (error) {
                reject(error)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    return  _voteProposal(wallet.web3,contract, id,auth, wallet.address, callback)
}

//创建或编辑验证人
export async function createOrEditValidator(wallet,feeAddr,moniker,identity,website,email,details, callback) {
    const contract = new wallet.web3.eth.Contract(Validators.abi, validatorsAddress)

    function _createOrEditValidator(web3, contract, feeAddr, moniker,identity,website,email,details,address, callback) {
        return new Promise((resolve, reject) => {
            //contract.methods.voteProposal(id,auth).send({from: address}).on('transactionHash', function (hash) {
            contract.methods.createOrEditValidator(feeAddr,moniker,identity,website,email,details).send({from: address}).on('transactionHash', function (hash) {
                callback({
                    message: hash,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success'
                    },
                    hash
                });
            }).on('receipt', function (receipt) {
                resolve(receipt)
            }).on('error', function (error) {
                reject(error)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    return  _createOrEditValidator(wallet.web3,contract,feeAddr,moniker,identity,website,email,details, wallet.address, callback)
}

//创建或编辑验证人
export async function stake(wallet,validator,money,callback) {
    const contract = new wallet.web3.eth.Contract(Validators.abi, validatorsAddress)

    function _stake(web3, contract, validator,money,address, callback) {
        return new Promise((resolve, reject) => {
            contract.methods.stake(validator).send({from: address,value: web3.utils.toWei(money, 'ether')}).on('transactionHash', function (hash) {
                callback({
                    message: hash,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success'
                    },
                    hash
                });
            }).on('receipt', function (receipt) {
                resolve(receipt)
            }).on('error', function (error) {
                reject(error)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    return  _stake(wallet.web3,contract,validator,money,wallet.address, callback)
}

//获取活跃验证人
export async function getActiveValidators(wallet) {
    const contract = new wallet.web3.eth.Contract(Validators.abi, validatorsAddress)
    return contract.methods.getActiveValidators().call({from: wallet.address})
}

//获取前面验证人
export async function getTopValidators(wallet) {
    const contract = new wallet.web3.eth.Contract(Validators.abi, validatorsAddress)
    return contract.methods.getTopValidators().call({from: wallet.address})
}

//获取该验证人信息
export async function getValidatorInfo(wallet,val) {
    const contract = new wallet.web3.eth.Contract(Validators.abi, validatorsAddress)
    return contract.methods.getValidatorInfo(val).call({from: wallet.address})
}

//获取在某个验证人的质押情况
export async function getStakingInfo(wallet,stake,val) {
    const contract = new wallet.web3.eth.Contract(Validators.abi, validatorsAddress)
    return contract.methods.getStakingInfo(stake,val).call({from: wallet.address})
}

//提取收益
export async function withdrawProfits(wallet,validator,callback) {
    const contract = new wallet.web3.eth.Contract(Validators.abi, validatorsAddress)

    function _withdrawProfits(web3, contract, validator,address, callback) {
        return new Promise((resolve, reject) => {
            contract.methods.withdrawProfits(validator).send({from: address}).on('transactionHash', function (hash) {
                callback({
                    message: hash,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success'
                    },
                    hash
                });
            }).on('receipt', function (receipt) {
                resolve(receipt)
            }).on('error', function (error) {
                reject(error)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    return  _withdrawProfits(wallet.web3,contract,validator,wallet.address, callback)
}

//提取本金
export async function withdrawStaking(wallet,validator,callback) {
    const contract = new wallet.web3.eth.Contract(Validators.abi, validatorsAddress)

    function _withdrawStaking(web3, contract, validator,address, callback) {
        return new Promise((resolve, reject) => {
            contract.methods.withdrawStaking(validator).send({from: address}).on('transactionHash', function (hash) {
                callback({
                    message: hash,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success'
                    },
                    hash
                });
            }).on('receipt', function (receipt) {
                resolve(receipt)
            }).on('error', function (error) {
                reject(error)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    return  _withdrawStaking(wallet.web3,contract,validator,wallet.address, callback)
}

//取消验证人资格
export async function unstake(wallet,validator,callback) {
    const contract = new wallet.web3.eth.Contract(Validators.abi, validatorsAddress)

    function _unstake(web3, contract, validator,address, callback) {
        return new Promise((resolve, reject) => {
            contract.methods.unstake(validator).send({from: address}).on('transactionHash', function (hash) {
                callback({
                    message: hash,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success'
                    },
                    hash
                });
            }).on('receipt', function (receipt) {
                resolve(receipt)
            }).on('error', function (error) {
                reject(error)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    return  _unstake(wallet.web3,contract,validator,wallet.address, callback)
}

//获取总质押量
export async function totalStake(wallet) {
    const contract = new wallet.web3.eth.Contract(Validators.abi, validatorsAddress)
    return contract.methods.totalStake().call({from: wallet.address})
}

