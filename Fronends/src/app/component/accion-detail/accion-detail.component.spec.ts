import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionDetailComponent } from './accion-detail.component';

describe('AccionDetailComponent', () => {
  let component: AccionDetailComponent;
  let fixture: ComponentFixture<AccionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccionDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
