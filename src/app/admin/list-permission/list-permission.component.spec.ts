import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPermissionComponent } from './list-permission.component';

describe('ListPermissionComponent', () => {
  let component: ListPermissionComponent;
  let fixture: ComponentFixture<ListPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
