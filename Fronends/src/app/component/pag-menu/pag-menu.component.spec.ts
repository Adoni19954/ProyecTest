import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagMenuComponent } from './pag-menu.component';

describe('PagMenuComponent', () => {
  let component: PagMenuComponent;
  let fixture: ComponentFixture<PagMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
