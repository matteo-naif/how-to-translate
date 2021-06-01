import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDictionaryComponent } from './dialog-dictionary.component';

describe('DialogDictionaryComponent', () => {
  let component: DialogDictionaryComponent;
  let fixture: ComponentFixture<DialogDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDictionaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
