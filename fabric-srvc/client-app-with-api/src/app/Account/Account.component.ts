/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from './Account.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  sortCode = new FormControl('', Validators.required);
  accountNumber = new FormControl('', Validators.required);
  accountType = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  asOfDate = new FormControl('', Validators.required);

  constructor(public serviceAccount: AccountService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      sortCode: this.sortCode,
      accountNumber: this.accountNumber,
      accountType: this.accountType,
      amount: this.amount,
      asOfDate: this.asOfDate
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAccount.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'com.dtlab.hackathon.assets.Account',
      'id': this.id.value,
      'sortCode': this.sortCode.value,
      'accountNumber': this.accountNumber.value,
      'accountType': this.accountType.value,
      'amount': this.amount.value,
      'asOfDate': this.asOfDate.value
    };

    this.myForm.setValue({
      'id': null,
      'sortCode': null,
      'accountNumber': null,
      'accountType': null,
      'amount': null,
      'asOfDate': null
    });

    return this.serviceAccount.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'sortCode': null,
        'accountNumber': null,
        'accountType': null,
        'amount': null,
        'asOfDate': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'com.dtlab.hackathon.assets.Account',
      'sortCode': this.sortCode.value,
      'accountNumber': this.accountNumber.value,
      'accountType': this.accountType.value,
      'amount': this.amount.value,
      'asOfDate': this.asOfDate.value
    };

    return this.serviceAccount.updateAsset(form.get('id').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceAccount.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceAccount.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'sortCode': null,
        'accountNumber': null,
        'accountType': null,
        'amount': null,
        'asOfDate': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.sortCode) {
        formObject.sortCode = result.sortCode;
      } else {
        formObject.sortCode = null;
      }

      if (result.accountNumber) {
        formObject.accountNumber = result.accountNumber;
      } else {
        formObject.accountNumber = null;
      }

      if (result.accountType) {
        formObject.accountType = result.accountType;
      } else {
        formObject.accountType = null;
      }

      if (result.amount) {
        formObject.amount = result.amount;
      } else {
        formObject.amount = null;
      }

      if (result.asOfDate) {
        formObject.asOfDate = result.asOfDate;
      } else {
        formObject.asOfDate = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'id': null,
      'sortCode': null,
      'accountNumber': null,
      'accountType': null,
      'amount': null,
      'asOfDate': null
      });
  }

}
