import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHandyManComponent } from './add-handy-man.component';

describe('AddHandyManComponent', () => {
  let component: AddHandyManComponent;
  let fixture: ComponentFixture<AddHandyManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHandyManComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHandyManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
