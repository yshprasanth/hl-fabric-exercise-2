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

import { Component } from '@angular/core';
import { MovementService } from '../services/movement.service';
import { SocketService } from '../services/socket.service';
import { Event } from '../models/Event';
import { ComposerSocketSubscriberService } from '../services/composer-socket-subscriber.service';
import { AccountService } from '../Account/Account.service';
import { environment } from 'environments/environment.prod';
import {Account} from '../com.dtlab.hackathon.assets';
import { MovementNotification } from '../com.dtlab.hackathon.events';
import { tap, map, debounce, timeInterval } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { ProgressDialogComponent } from '../progress-dialog/progress-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  movementData: MovementNotification[] = [];
  srcAccount: Account;
  trgAccount: Account;
  

  constructor(private movementService: MovementService,
          private socketService: SocketService,
          private composerSocketService: ComposerSocketSubscriberService,
          private accountService: AccountService,
          public snackBar: MatSnackBar,
          public dialog: MatDialog) {
  }

  ngOnInit() {
    // this.movementService.data$
    // .subscribe(m => this.movementData.push(m));}

    // this.socketService.initSocket();
    // this.socketService.onEvent(Event.event)
    //   .subscribe(m => {
    //     console.log("received event: " + Event.event + ":: " + JSON.stringify(m));
    //     this.movementData.push(m);
    //   });

    this.accountService.getAsset(environment.SRC_ACCOUNT_ID)
        .subscribe(a => this.srcAccount = a);

    this.accountService.getAsset(environment.TRG_ACCOUNT_ID)
        .subscribe(a => this.trgAccount = a);

    this.composerSocketService.initSocket();
    let pipe1: Observable<MovementNotification> = this.composerSocketService.socket$.pipe(
                    tap(m => {
                      console.log("inside progress dialog");
                      this.openProgressDialog();
                    }),
                    debounce(() => timer(5000)),
                    tap(m => {
                      console.log("closing progress dialog");
                      this.closeProgressDialog();
                    }),
                    map(m => {
                      console.log("inside map");
                      return m;
                    })
                );
    pipe1.subscribe(
      m => {
        console.log("inside subscribe, received event: " + Event.event + ":: " + JSON.stringify(m));
        this.movementData.push(m);
        this.srcAccount.amount = m.srcAccountBalanceAfterTransaction;
        this.trgAccount.amount = m.trgAccountBalanceAfterTransaction;
      }
    );
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2000,
    });
  }

  openProgressDialog() {
    const dialogRef = this.dialog.open(ProgressDialogComponent, {
                        width: '250px'
                      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.openSnackBar();
    });
  }

  closeProgressDialog() {
    this.dialog.closeAll();
    //this.dialogRef.close();
  }
}
