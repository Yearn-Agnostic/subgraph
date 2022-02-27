import { log, BigInt } from '@graphprotocol/graph-ts'
import { Transfer,Vault as VaultContract } from '../../generated/templates/Vault/Vault'
import { UserVaultBalance, Vault} from '../../generated/schema'
import { ADDRESS_ZERO, convertEthToDecimal, loadUserVaultBalance, BI_18} from "./helpers"

export function handleTransfer(event: Transfer): void {
    if (event.params.to.toHexString() == ADDRESS_ZERO && event.params.value.equals(BigInt.fromI32(1000))) {
        return
    }
    let user:UserVaultBalance
    let vault = Vault.load(event.address.toHexString())
    let vaultContract = VaultContract.bind(event.address)

    //check deposit event
    if(event.params.from.toHexString() == ADDRESS_ZERO){
        user = loadUserVaultBalance(event.params.to, event.address);
        const value = convertEthToDecimal(event.params.value);
        user.amount = user.amount.plus(value);
        log.info('Deposit by {}\n value is {} balance is {}',[user.id,value.toString(), user.amount.toString()]);
    }
    //check for withdraw
    if(event.params.to.toHexString() == ADDRESS_ZERO){
        user = loadUserVaultBalance(event.params.from, event.address);
        const value = convertEthToDecimal(event.params.value);
        user.amount = user.amount.minus(value);
        log.info('Withdraw by {}\n value is {} balance is {}',[user.id,value.toString(), user.amount.toString()]);
    }
    {
        const balance = vaultContract.balance()
        const totalSupply = vaultContract.totalSupply()
        if(!balance.isZero() && !totalSupply.isZero()){
            vault.pricePerFullShare = balance.times(BI_18).div(totalSupply)
        }else{
            vault.pricePerFullShare = BigInt.fromI32(0);
        }
        vault.timestamp = event.block.timestamp;
    }

    user.save()
    vault.save()
}



