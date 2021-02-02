import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        wallet: {
            address: "",
            web3: null,
            connected: false,
            networkId: 1,
            addressList:[]
        }
    },
    mutations: {
        updateWallet(state, wallet) {
            state.wallet = wallet
        },
        updateAddress(state, address) {
            state.wallet.address = address
        },
        updateNetworkId(state, networkId) {
            state.wallet.networkId = networkId
        },
        clearWallet(state) {
            state.wallet = {
                address: "",
                web3: null,
                connected: false,
                networkId: 999,
                addressList: []
            }
        }
    },
    actions: {},
    modules: {}
})
