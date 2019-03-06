import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {AccountType,TransactionType} from './com.dtlab.hackathon.common';
// export namespace com.dtlab.hackathon.assets{
   export class Account extends Asset {
      id: string;
      sortCode: number;
      accountNumber: number;
      accountType: AccountType;
      amount: number;
      asOfDate: Date;
   }
   export class MovementItem extends Asset {
      id: string;
      accountId: string;
      transactionType: TransactionType;
      transactionRefText: string;
      transactionTime: Date;
      transactionValue: number;
      accountBalanceAfterTransaction: number;
      otherAccountId: string;
      fromAccountName: string;
      payeeId: string;
      payeeName: string;
   }
   export class Product extends Asset {
      id: string;
      productCode: string;
      productType: string;
      productDescription: string;
   }
// }
