import {Address, BigDecimal, BigInt} from "@graphprotocol/graph-ts/index";
import {UserVaultBalance, Vault} from "../../generated/schema";

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const ZERO_BD = BigDecimal.fromString('0')
export const ZERO_BI = BigInt.fromI32(0)
export const ONE_BI = BigInt.fromI32(1)
export const BI_18 = BigInt.fromI32(18)

export const VAULT_1 = '0xae927f189af6ebd69f89052d52e8538a5ee2acaa';
export const VAULT_2 = '0xc1cbb6f05ab56a70f7a1029ce439a1a837a0fff6';

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
    let bd = BigDecimal.fromString('1')
    for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
        bd = bd.times(BigDecimal.fromString('10'))
    }
    return bd
}

export function convertEthToDecimal(eth: BigInt): BigDecimal {
    return eth.toBigDecimal().div(exponentToBigDecimal(BI_18))
}

export function loadUserVaultBalance(address:Address,vault:Address): UserVaultBalance {
    let user = UserVaultBalance.load(address.toHexString() +'_' + vault.toHexString())
    if (user == null) {
        user = new UserVaultBalance(address.toHexString() +'_' + vault.toHexString())
        user.address = address.toHexString()
        user.amount = ZERO_BD
        user.vault = Vault.load(vault.toHexString()).id
    }
    return user as UserVaultBalance;
}