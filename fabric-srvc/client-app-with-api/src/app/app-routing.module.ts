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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AccountComponent } from './Account/Account.component';
import { MovementItemComponent } from './MovementItem/MovementItem.component';
import { ProductComponent } from './Product/Product.component';

import { CustomerComponent } from './Customer/Customer.component';
import { PayeeComponent } from './Payee/Payee.component';

import { MovementRequestComponent } from './MovementRequest/MovementRequest.component';
import { InternalTransferComponent } from './InternalTransfer/InternalTransfer.component';
import { InitLedgerComponent } from './InitLedger/InitLedger.component';
import { JobComponent } from './Job/Job.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Account', component: AccountComponent },
  { path: 'MovementItem', component: MovementItemComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'Customer', component: CustomerComponent },
  { path: 'Payee', component: PayeeComponent },
  { path: 'MovementRequest', component: MovementRequestComponent },
  { path: 'InternalTransfer', component: InternalTransferComponent },
  { path: 'InitLedger', component: InitLedgerComponent },
  { path: 'Job', component: JobComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
