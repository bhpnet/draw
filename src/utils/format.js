import BigNumber from "bignumber.js";

export function formUSDT(amount) {
    let balance = new BigNumber(amount)
    return balance.div("1000000").toNumber()
}

export function toUSDT(amount) {
    let balance = new BigNumber(amount)
    return balance.times("1000000").toNumber()
}

export function formBHP(amount) {
    let balance = new BigNumber(amount)
    return balance.div("1000000000000000000").toNumber()
}

export function toBHP(amount) {
    let balance = new BigNumber(amount)
    return balance.times("1000000000000000000").toNumber()
}