import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {TransactionType,Jobs} from './com.dtlab.hackathon.common';
import {Account} from './com.dtlab.hackathon.assets';
import {Payee,Customer} from './com.dtlab.hackathon.participants';
// export namespace com.dtlab.hackathon.transactions{
   export class MovementRequest extends Transaction {
      transactionType: TransactionType;
      transactionRefText: string;
      transactionTime: Date;
      transactionValue: number;
      account: Account;
      payeeAccount: Account;
      payee: Payee;
   }
   export class InternalTransfer extends Transaction {
      transferValue: number;
      referenceText: string;
      fromAccount: Account;
      toAccount: Account;
      user: Customer;
   }
   export class InitLedger extends Transaction {
      reload: boolean;
   }
   export class Job extends Transaction {
      jobName: Jobs;
   }
// }
