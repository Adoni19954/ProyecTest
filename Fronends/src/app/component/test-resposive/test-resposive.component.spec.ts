import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResposiveComponent } from './test-resposive.component';

describe('TestResposiveComponent', () => {
  let component: TestResposiveComponent;
  let fixture: ComponentFixture<TestResposiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestResposiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestResposiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
