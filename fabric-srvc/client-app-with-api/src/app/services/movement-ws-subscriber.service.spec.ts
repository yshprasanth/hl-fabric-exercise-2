import { TestBed, inject } from '@angular/core/testing';

import { MovementWsSubscriberService } from './movement-ws-subscriber.service';

describe('MovementWsSubscriberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovementWsSubscriberService]
    });
  });

  it('should ...', inject([MovementWsSubscriberService], (service: MovementWsSubscriberService) => {
    expect(service).toBeTruthy();
  }));
});
