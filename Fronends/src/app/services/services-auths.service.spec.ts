import { TestBed } from '@angular/core/testing';
import { ServicesAuthsService } from './services-auths.service';


describe('ServicesAuthsService', () => {
  let service: ServicesAuthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesAuthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
