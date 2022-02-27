import { ethereum } from '@graphprotocol/graph-ts'
import { SetVault } from '../../generated/Controller/Controller'
import {Vault, VaultHistory} from '../../generated/schema'
import { Vault as VaultTemplate } from '../../generated/templates'
import { VAULT_1, ZERO_BI, VAULT_2, BI_18 } from "./helpers"

export function handleSetVault(event: SetVault): void {
    VaultTemplate.create(event.params._vault)
    let vault:Vault = new Vault(event.params._vault.toHexString());
    vault.address = event.params._vault;
    vault.pricePerFullShare = ZERO_BI;
    vault.timestamp = event.block.timestamp;
    vault.save()
}

export function handleBlock(block: ethereum.Block): void {

    {
        let vaultCheck = Vault.load(VAULT_2);
        if( vaultCheck !== null ) {
            let historicalVault = new VaultHistory(block.hash.toHexString() + '_' + block.timestamp.toString() + '_1');
            historicalVault.pricePerFullShare = vaultCheck.pricePerFullShare;
            historicalVault.timestamp = block.timestamp;
            historicalVault.address = VAULT_1;
            historicalVault.block = block.number;
            historicalVault.save();
        }
    }

    {
        let vaultCheck = Vault.load(VAULT_2);
        if( vaultCheck !== null ){
            let historicalVault = new VaultHistory(block.hash.toHexString() + '_' + block.timestamp.toString()+'_2');
            historicalVault.pricePerFullShare = vaultCheck.pricePerFullShare;
            historicalVault.timestamp = block.timestamp;
            historicalVault.address = VAULT_2;
            historicalVault.block = block.number;
            historicalVault.save();
        }

    }
}