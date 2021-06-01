import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryModel, TranslationModel } from '../../commons/models/object.model';
import { Subscription } from 'rxjs';
import { TranslateService } from '../../commons/services/translate.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilService } from '../../commons/services/util.service';

@Component({
  selector: 'app-dialog-add-translation',
  templateUrl: './dialog-add-translation.component.html',
  styleUrls: ['./dialog-add-translation.component.scss']
})
export class DialogAddTranslationComponent implements OnInit, OnDestroy {
  form: any;
  currentObject: DictionaryModel = new DictionaryModel();
  subscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any = {},
    private fb: FormBuilder,
    private translateService: TranslateService,
    private utilService: UtilService
  ) {

    this.subscription = this.translateService.valuesChanged
      .subscribe((val: DictionaryModel) => {
        this.currentObject = val;

        this.createForm();
      });
  }

  createForm() {
    this.form = this.fb.group({
      initial: ['', Validators.required],
      translated: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  addTranslation(){

    const newValue: TranslationModel = {
      it: this.utilService.formatString(this.form.value.initial),
      en: this.utilService.formatString(this.form.value.translated)
    }

    const isUnique = this.translateService.getFilteredList([newValue]).length > 0;

    if(isUnique){
      this.currentObject.values.push(newValue);
      this.translateService.setCurrentValues(this.currentObject);
      this.utilService.openSnackBar('Traduzione aggiunta');
    } else {
      this.utilService.openSnackBar('Parola già presente nel dizionario');
    }

  }

}
