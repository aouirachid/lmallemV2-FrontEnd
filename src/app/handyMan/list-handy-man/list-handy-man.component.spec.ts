import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHandyManComponent } from './list-handy-man.component';

describe('ListHandyManComponent', () => {
  let component: ListHandyManComponent;
  let fixture: ComponentFixture<ListHandyManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHandyManComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHandyManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
