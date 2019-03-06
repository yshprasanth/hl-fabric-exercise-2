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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule } from '@angular/material';

import { AccountComponent } from './Account/Account.component';
import { MovementItemComponent } from './MovementItem/MovementItem.component';
import { ProductComponent } from './Product/Product.component';

import { CustomerComponent } from './Customer/Customer.component';
import { PayeeComponent } from './Payee/Payee.component';

import { MovementRequestComponent } from './MovementRequest/MovementRequest.component';
import { InternalTransferComponent } from './InternalTransfer/InternalTransfer.component';
import { InitLedgerComponent } from './InitLedger/InitLedger.component';
import { JobComponent } from './Job/Job.component';
import { MovementService } from './services/movement.service';
import { SocketService } from './services/socket.service';
import { ComposerSocketSubscriberService } from './services/composer-socket-subscriber.service';
import { AccountService } from './Account/Account.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    MovementItemComponent,
    ProductComponent,
    CustomerComponent,
    PayeeComponent,
    MovementRequestComponent,
    InternalTransferComponent,
    InitLedgerComponent,
    JobComponent,
    SnackbarComponent,
    ProgressDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule  ],
  entryComponents: [SnackbarComponent, ProgressDialogComponent],
  providers: [
    DataService,
    MovementService,
    SocketService,
    ComposerSocketSubscriberService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
