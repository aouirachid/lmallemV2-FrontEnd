import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivredOrderComponent } from './delivred-order.component';

describe('DelivredOrderComponent', () => {
  let component: DelivredOrderComponent;
  let fixture: ComponentFixture<DelivredOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelivredOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelivredOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
