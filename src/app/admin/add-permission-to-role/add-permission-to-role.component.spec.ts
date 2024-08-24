import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPermissionToRoleComponent } from './add-permission-to-role.component';

describe('AddPermissionToRoleComponent', () => {
  let component: AddPermissionToRoleComponent;
  let fixture: ComponentFixture<AddPermissionToRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPermissionToRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPermissionToRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
