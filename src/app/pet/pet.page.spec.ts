import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPage } from './pet.page';

describe('PetPage', () => {
  let component: PetPage;
  let fixture: ComponentFixture<PetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
