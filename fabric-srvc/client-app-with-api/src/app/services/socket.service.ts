import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as socketIo from 'socket.io-client';
import { environment } from 'environments/environment';

@Injectable()
export class SocketService {
    private socket;

    static SERVER_URL = 'ws://' + environment.COMPOSER_REST_SERVER_HOST + ":" + environment.COMPOSER_REST_SERVER_PORT;

    public initSocket(): void {
        this.socket = socketIo(SocketService.SERVER_URL);
    }

    public send(message: any): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<any> {
      console.log('SocketService - onMessage..');

      return new Observable<any>(observer => {
          this.socket.on('message', (data: any) => observer.next(data));
      });
    }

    public onEvent(event: Event): Observable<any> {
      console.log('SocketService - onEvent..');
      return new Observable<Event>(observer => {
          this.socket.on(event, () => observer.next());
      });
    }
}
