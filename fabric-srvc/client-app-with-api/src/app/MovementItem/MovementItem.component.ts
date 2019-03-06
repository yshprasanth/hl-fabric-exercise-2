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
import { MovementItemService } from './MovementItem.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-movementitem',
  templateUrl: './MovementItem.component.html',
  styleUrls: ['./MovementItem.component.css'],
  providers: [MovementItemService]
})
export class MovementItemComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  accountId = new FormControl('', Validators.required);
  transactionType = new FormControl('', Validators.required);
  transactionRefText = new FormControl('', Validators.required);
  transactionTime = new FormControl('', Validators.required);
  transactionValue = new FormControl('', Validators.required);
  accountBalanceAfterTransaction = new FormControl('', Validators.required);
  otherAccountId = new FormControl('', Validators.required);
  fromAccountName = new FormControl('', Validators.required);
  payeeId = new FormControl('', Validators.required);
  payeeName = new FormControl('', Validators.required);

  constructor(public serviceMovementItem: MovementItemService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      accountId: this.accountId,
      transactionType: this.transactionType,
      transactionRefText: this.transactionRefText,
      transactionTime: this.transactionTime,
      transactionValue: this.transactionValue,
      accountBalanceAfterTransaction: this.accountBalanceAfterTransaction,
      otherAccountId: this.otherAccountId,
      fromAccountName: this.fromAccountName,
      payeeId: this.payeeId,
      payeeName: this.payeeName
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMovementItem.getAll()
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
      $class: 'com.dtlab.hackathon.assets.MovementItem',
      'id': this.id.value,
      'accountId': this.accountId.value,
      'transactionType': this.transactionType.value,
      'transactionRefText': this.transactionRefText.value,
      'transactionTime': this.transactionTime.value,
      'transactionValue': this.transactionValue.value,
      'accountBalanceAfterTransaction': this.accountBalanceAfterTransaction.value,
      'otherAccountId': this.otherAccountId.value,
      'fromAccountName': this.fromAccountName.value,
      'payeeId': this.payeeId.value,
      'payeeName': this.payeeName.value
    };

    this.myForm.setValue({
      'id': null,
      'accountId': null,
      'transactionType': null,
      'transactionRefText': null,
      'transactionTime': null,
      'transactionValue': null,
      'accountBalanceAfterTransaction': null,
      'otherAccountId': null,
      'fromAccountName': null,
      'payeeId': null,
      'payeeName': null
    });

    return this.serviceMovementItem.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'accountId': null,
        'transactionType': null,
        'transactionRefText': null,
        'transactionTime': null,
        'transactionValue': null,
        'accountBalanceAfterTransaction': null,
        'otherAccountId': null,
        'fromAccountName': null,
        'payeeId': null,
        'payeeName': null
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
      $class: 'com.dtlab.hackathon.assets.MovementItem',
      'accountId': this.accountId.value,
      'transactionType': this.transactionType.value,
      'transactionRefText': this.transactionRefText.value,
      'transactionTime': this.transactionTime.value,
      'transactionValue': this.transactionValue.value,
      'accountBalanceAfterTransaction': this.accountBalanceAfterTransaction.value,
      'otherAccountId': this.otherAccountId.value,
      'fromAccountName': this.fromAccountName.value,
      'payeeId': this.payeeId.value,
      'payeeName': this.payeeName.value
    };

    return this.serviceMovementItem.updateAsset(form.get('id').value, this.asset)
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

    return this.serviceMovementItem.deleteAsset(this.currentId)
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

    return this.serviceMovementItem.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'accountId': null,
        'transactionType': null,
        'transactionRefText': null,
        'transactionTime': null,
        'transactionValue': null,
        'accountBalanceAfterTransaction': null,
        'otherAccountId': null,
        'fromAccountName': null,
        'payeeId': null,
        'payeeName': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.accountId) {
        formObject.accountId = result.accountId;
      } else {
        formObject.accountId = null;
      }

      if (result.transactionType) {
        formObject.transactionType = result.transactionType;
      } else {
        formObject.transactionType = null;
      }

      if (result.transactionRefText) {
        formObject.transactionRefText = result.transactionRefText;
      } else {
        formObject.transactionRefText = null;
      }

      if (result.transactionTime) {
        formObject.transactionTime = result.transactionTime;
      } else {
        formObject.transactionTime = null;
      }

      if (result.transactionValue) {
        formObject.transactionValue = result.transactionValue;
      } else {
        formObject.transactionValue = null;
      }

      if (result.accountBalanceAfterTransaction) {
        formObject.accountBalanceAfterTransaction = result.accountBalanceAfterTransaction;
      } else {
        formObject.accountBalanceAfterTransaction = null;
      }

      if (result.otherAccountId) {
        formObject.otherAccountId = result.otherAccountId;
      } else {
        formObject.otherAccountId = null;
      }

      if (result.fromAccountName) {
        formObject.fromAccountName = result.fromAccountName;
      } else {
        formObject.fromAccountName = null;
      }

      if (result.payeeId) {
        formObject.payeeId = result.payeeId;
      } else {
        formObject.payeeId = null;
      }

      if (result.payeeName) {
        formObject.payeeName = result.payeeName;
      } else {
        formObject.payeeName = null;
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
      'accountId': null,
      'transactionType': null,
      'transactionRefText': null,
      'transactionTime': null,
      'transactionValue': null,
      'accountBalanceAfterTransaction': null,
      'otherAccountId': null,
      'fromAccountName': null,
      'payeeId': null,
      'payeeName': null
      });
  }

}
