import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdminComponent } from './list-admin.component';

describe('ListAdminComponent', () => {
  let component: ListAdminComponent;
  let fixture: ComponentFixture<ListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
