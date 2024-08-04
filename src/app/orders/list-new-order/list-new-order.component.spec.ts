import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewOrderComponent } from './list-new-order.component';

describe('ListNewOrderComponent', () => {
  let component: ListNewOrderComponent;
  let fixture: ComponentFixture<ListNewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListNewOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
