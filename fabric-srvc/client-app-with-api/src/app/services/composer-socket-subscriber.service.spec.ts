import { TestBed, inject } from '@angular/core/testing';

import { ComposerSocketSubscriberService } from './composer-socket-subscriber.service';

describe('ComposerSocketSubscriberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComposerSocketSubscriberService]
    });
  });

  it('should ...', inject([ComposerSocketSubscriberService], (service: ComposerSocketSubscriberService) => {
    expect(service).toBeTruthy();
  }));
});
