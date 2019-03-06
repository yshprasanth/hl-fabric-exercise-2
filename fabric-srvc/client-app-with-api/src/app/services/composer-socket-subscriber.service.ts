import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { environment } from 'environments/environment';
import { MovementNotification } from '../com.dtlab.hackathon.events';

@Injectable()
export class ComposerSocketSubscriberService {
  socket$: WebSocketSubject<MovementNotification>;
  static SERVER_URL = 'ws://' + environment.COMPOSER_REST_SERVER_HOST + ":" + environment.COMPOSER_REST_SERVER_PORT;
  constructor() {
  }

  public initSocket(): void {
    this.socket$ = WebSocketSubject.create(ComposerSocketSubscriberService.SERVER_URL);
    console.log("connected");
  }

}
