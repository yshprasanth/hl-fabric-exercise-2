import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {TransactionType} from './com.dtlab.hackathon.common';
import {Account} from './com.dtlab.hackathon.assets';
import {Payee} from './com.dtlab.hackathon.participants';
// export namespace com.dtlab.hackathon.events{
   export class MovementNotification extends Event {
    transactionType: string;
    transactionRefText: string;
    transactionTime: Date;
    transactionValue: number;
    trgAccountId: string;
    trgAccountBalanceAfterTransaction: number;
    srcAccountId: string;
    srcAccountBalanceAfterTransaction: number;
    srcAccount: Account;
    trgAccount: Account;
   }
   export class InternalTransferNotification extends Event {
      account: Account;
   }
// }
