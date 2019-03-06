import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.dtlab.hackathon.common{
   export enum AccountType {
      PersonalAccount,
      SavingsAccount,
      CurrentAccount,
      ExternalAccount,
      InternalAccount,
   }
   export enum TransactionType {
      Debit,
      Credit,
      Interest,
      InternalTransfer,
      CashBack,
   }
   export enum Jobs {
      CashBack,
      Interest,
   }
// }
