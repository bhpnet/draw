import Web3 from "web3";

export async function connectWallet(that) {

    let web3js = window.web3;
    let provider;
    if (window.ethereum) {
        let ethereum = window.ethereum;
        web3js = new Web3(ethereum);
        try {
            // Request account access if needed
            //使用window.ethereum来判断是否新版metamask，如果是的话，就调用ethereum.enable() 方法来请求用户授权，这将在用户网页中弹出一个授权对话框，代码如下：
            //https://blog.csdn.net/weixin_39421014/article/details/103323245
            await ethereum.enable();
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
        }
    } else if (window.web3) {
        provider = web3js.currentProvider;
        web3js = new Web3(web3js.currentProvider);
    }

    if (typeof web3js !== 'undefined') {
        provider = web3js.currentProvider;
    }

    const web3 =await new Web3(provider)
    const subscribeProvider = provider => {
        if (!provider.on) {
            return;
        }
        provider.on("connect", async (chainId) => {
            const web3 = new Web3(provider)
            let account = await web3.eth.getAccounts()
            console.log("123:"+account)
            that.updateWallet({
                address: account[0],
                web3: web3,
                connected: true,
                networkId: chainId,
                addressList:account
            });
            //that.changeUpdate();
        })
        provider.on("accountsChanged", async (accounts) => {
            console.log("地址改变："+accounts)
            if (!accounts[0]) {
                await disconnectWallet(web3, data => {
                })
                return
            }
            // 更新地址
            that.updateAddress(accounts[0]);
            // 更新数据
            that.changeUpdate();
        });
        provider.on("networkChanged", async (networkId) => {
            console.log("网络改变："+networkId)
            if (!(parseInt(networkId) == 3476||parseInt(networkId) == 6794)) {
                await disconnectWallet(web3, data => {
                })
            }
            // 更新地址
            that.updateNetworkId(parseInt(networkId));
            // 更新数据
            //that.changeUpdate();
        });
    }
    await subscribeProvider(provider);
    let account = await web3.eth.getAccounts()
    let chainId = await web3.eth.getChainId()
    that.updateWallet({
        address: account[0],
        web3: web3,
        connected: true,
        networkId: chainId,
        addressList: account
    });
    that.changeUpdate();
}


export function disconnectWallet(web3, callback) {
    return new Promise(async (resolve, reject) => {
        try {
            if (web3 && web3.currentProvider && web3.currentProvider.close) {
                await web3.currentProvider.close();
            }
            callback({isConnect: true});
            resolve()
        } catch (error) {
            callback({isConnect: false})
            reject(error)
        }
    });
}