import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
// import { BusinessNetworkConnection } from 'composer-client';

const cardname = 'admin@dtlab-hackathon-app';

@Injectable()
export class MovementService {
  private businessNetworkDefinition;
  private bizNetworkConnection;
  private dataSubject = new ReplaySubject<any>(1);
  data$: Observable<any> = this.dataSubject.asObservable();
//private bizNetworkConnection: BusinessNetworkConnection
  constructor() {
  }

  ngOnInit() {
    // this.bizNetworkConnection = new BusinessNetworkConnection();
    // this.businessNetworkDefinition = this.bizNetworkConnection.connect(cardname);
    // this.bizNetworkConnection.on('event', (event) => {
    //   this.handleEvent(event);
    // });
  }

  async handleEvent(event) {
    console.log('MovementService - received new event..');

    // let serializer = await this.businessNetworkDefinition.getSerializer();
    // let factory = await this.businessNetworkDefinition.getFactory();
    // let movementNotification = serializer.toJSON(event)
    // console.log(JSON.stringify(movementNotification));
    // this.dataSubject.next(movementNotification);
    
  }


}
