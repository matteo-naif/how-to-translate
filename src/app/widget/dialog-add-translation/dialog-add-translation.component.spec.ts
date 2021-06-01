import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTranslationComponent } from './dialog-add-translation.component';

describe('DialogAddTranslationComponent', () => {
  let component: DialogAddTranslationComponent;
  let fixture: ComponentFixture<DialogAddTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
