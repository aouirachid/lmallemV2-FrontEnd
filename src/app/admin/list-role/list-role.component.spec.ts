import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoleComponent } from './list-role.component';

describe('ListRoleComponent', () => {
  let component: ListRoleComponent;
  let fixture: ComponentFixture<ListRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
