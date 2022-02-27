import { log, BigInt } from '@graphprotocol/graph-ts'
import { TransferRequested } from '../../../generated/Bridge/Bridge'
import { TransferRequested as TR} from '../../../generated/schema'

export function handleTransferRequested(event: TransferRequested): void {
    let transferEntity:TR;
    transferEntity = new TR(event.transaction.hash.toHexString())
    transferEntity.from = event.params.from.toHexString();
    transferEntity.to = event.params.to.toHexString();
    transferEntity.step = BigInt.fromI32(event.params.step);
    transferEntity.amount = event.params.amount.toString();
    transferEntity.date = event.params.date;
    transferEntity.signature = event.params.signature.toHexString();
    transferEntity.transactionId = event.params.transactionId;
    transferEntity.block = event.block.number;
    transferEntity.save();
    log.info('Event main params: {} {} {}', [event.params.from.toHexString(), event.params.to.toHexString(), event.params.amount.toString()])
}



