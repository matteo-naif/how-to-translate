import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TranslationModel, DictionaryModel } from '../commons/models/object.model';
import { TranslateService } from '../commons/services/translate.service';
import { UtilService } from '../commons/services/util.service';
import { DialogDictionaryComponent } from '../widget/dialog-dictionary/dialog-dictionary.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  form: any;
  currentTranslation: TranslationModel = new TranslationModel();
  dictionary: DictionaryModel = new DictionaryModel();
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    public translateService: TranslateService,
    private dialog: MatDialog,
    private utilService: UtilService
  ) {

    this.subscription = this.translateService.valuesChanged
      .subscribe((val: DictionaryModel) => {
        this.dictionary = val;

        this.createForm();
        this.populateForm();

      });
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      translated: ['']
    });
  }

  populateForm() {

    this.currentTranslation = this.getRandomTranslation(this.dictionary.values);

    if(this.currentTranslation){
      this.form.get('translated').setValue(null, { emitValue: false })
    }
  }

  getRandomTranslation(translationList: TranslationModel[]): TranslationModel {
    const index = Math.floor(Math.random() * translationList.length);
    return translationList[index];
  }

  checkAnswer() {
    const userAnswer: string = this.form.value.translated || '';
    const correctAnswer: string = this.currentTranslation.en || '';

    if (!userAnswer) {
      this.utilService.openSnackBar('Non hai scritto nulla :(');
      return;
    }

    const rating = this.utilService.jaroWinkler(userAnswer, correctAnswer);

    if (rating > 0.95) {
      this.utilService.openSnackBar('Risposta corretta!', undefined, undefined, 'dialog-success');
      this.populateForm();
      return;
    }

    if(rating > 0.8){
      this.utilService.openSnackBar('Risposta quasi esatta...');
      return;
    }

    this.utilService.openSnackBar('Hai sbagliato, riprova...', undefined, undefined, 'dialog-error');
  }

  openDialogDictionary() {
    this.dialog.open(DialogDictionaryComponent, { panelClass: 'dialog-medium' });
  }

}
