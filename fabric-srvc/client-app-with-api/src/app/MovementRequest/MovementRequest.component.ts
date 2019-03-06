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
import { MovementRequestService } from './MovementRequest.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-movementrequest',
  templateUrl: './MovementRequest.component.html',
  styleUrls: ['./MovementRequest.component.css'],
  providers: [MovementRequestService]
})
export class MovementRequestComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  transactionType = new FormControl('', Validators.required);
  transactionRefText = new FormControl('', Validators.required);
  transactionTime = new FormControl('', Validators.required);
  transactionValue = new FormControl('', Validators.required);
  account = new FormControl('', Validators.required);
  payeeAccount = new FormControl('', Validators.required);
  payee = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceMovementRequest: MovementRequestService, fb: FormBuilder) {
    this.myForm = fb.group({
      transactionType: this.transactionType,
      transactionRefText: this.transactionRefText,
      transactionTime: this.transactionTime,
      transactionValue: this.transactionValue,
      account: this.account,
      payeeAccount: this.payeeAccount,
      payee: this.payee,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMovementRequest.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'com.dtlab.hackathon.transactions.MovementRequest',
      'transactionType': this.transactionType.value,
      'transactionRefText': this.transactionRefText.value,
      'transactionTime': this.transactionTime.value,
      'transactionValue': this.transactionValue.value,
      'account': this.account.value,
      'payeeAccount': this.payeeAccount.value,
      'payee': this.payee.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'transactionType': null,
      'transactionRefText': null,
      'transactionTime': null,
      'transactionValue': null,
      'account': null,
      'payeeAccount': null,
      'payee': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceMovementRequest.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'transactionType': null,
        'transactionRefText': null,
        'transactionTime': null,
        'transactionValue': null,
        'account': null,
        'payeeAccount': null,
        'payee': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'com.dtlab.hackathon.transactions.MovementRequest',
      'transactionType': this.transactionType.value,
      'transactionRefText': this.transactionRefText.value,
      'transactionTime': this.transactionTime.value,
      'transactionValue': this.transactionValue.value,
      'account': this.account.value,
      'payeeAccount': this.payeeAccount.value,
      'payee': this.payee.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceMovementRequest.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceMovementRequest.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceMovementRequest.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'transactionType': null,
        'transactionRefText': null,
        'transactionTime': null,
        'transactionValue': null,
        'account': null,
        'payeeAccount': null,
        'payee': null,
        'transactionId': null,
        'timestamp': null
      };

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

      if (result.account) {
        formObject.account = result.account;
      } else {
        formObject.account = null;
      }

      if (result.payeeAccount) {
        formObject.payeeAccount = result.payeeAccount;
      } else {
        formObject.payeeAccount = null;
      }

      if (result.payee) {
        formObject.payee = result.payee;
      } else {
        formObject.payee = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'transactionType': null,
      'transactionRefText': null,
      'transactionTime': null,
      'transactionValue': null,
      'account': null,
      'payeeAccount': null,
      'payee': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
