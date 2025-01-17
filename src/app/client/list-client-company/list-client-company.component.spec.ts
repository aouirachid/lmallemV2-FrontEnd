import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientCompanyComponent } from './list-client-company.component';

describe('ListClientCompanyComponent', () => {
  let component: ListClientCompanyComponent;
  let fixture: ComponentFixture<ListClientCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClientCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
