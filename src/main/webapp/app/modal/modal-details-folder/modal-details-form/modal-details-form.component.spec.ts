import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsFormComponent } from './modal-details-form.component';

describe('ModalDetailsFormComponent', () => {
  let component: ModalDetailsFormComponent;
  let fixture: ComponentFixture<ModalDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
