import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHandyManComponent } from './edit-handy-man.component';

describe('EditHandyManComponent', () => {
  let component: EditHandyManComponent;
  let fixture: ComponentFixture<EditHandyManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHandyManComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHandyManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
