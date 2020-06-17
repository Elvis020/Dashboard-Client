/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataInputService } from './data-input.service';

describe('Service: DataInput', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataInputService]
    });
  });

  it('should ...', inject([DataInputService], (service: DataInputService) => {
    expect(service).toBeTruthy();
  }));
});
