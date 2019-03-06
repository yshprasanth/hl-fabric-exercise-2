import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Account} from './com.dtlab.hackathon.assets';
// export namespace com.dtlab.hackathon.participants{
   export abstract class User extends Participant {
      id: string;
      account: Account[];
   }
   export class Customer extends User {
      firstName: string;
      lastName: string;
      title: string;
   }
   export class Payee extends User {
      payeeName: string;
      cashBackPercent: number;
   }
// }
