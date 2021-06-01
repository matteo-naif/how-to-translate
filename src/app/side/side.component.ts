import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTranslationComponent } from '../widget/dialog-add-translation/dialog-add-translation.component';
import { TranslateService } from '../commons/services/translate.service';
import { TranslationModel, DictionaryModel } from '../commons/models/object.model';
import { Subscription } from 'rxjs';
import { UtilService } from '../commons/services/util.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  dictionary: DictionaryModel = new DictionaryModel();

  constructor(
    private dialog: MatDialog,
    public translateService: TranslateService,
    private utilService: UtilService
  ) {
    this.subscription = this.translateService.valuesChanged
      .subscribe((val: DictionaryModel) => {
        this.dictionary = val;
      });
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  importTranslationList(dictionary: TranslationModel[]) {

    const dictionaryToImport: TranslationModel[] = this.translateService.getFilteredList(dictionary);

    console.log(dictionaryToImport);

    if (dictionaryToImport.length > 0) {
      this.dictionary.values.push(...dictionaryToImport);
      this.translateService.setCurrentValues(this.dictionary)
      this.utilService.openSnackBar(`Hai aggiunto ${dictionaryToImport.length} ${dictionaryToImport.length > 1 ? 'parole' : 'parola'}`);
    } else {
      this.utilService.openSnackBar('Le parole che vuoi aggiungere sono già nel dizionario');
    }
  }

  openDialogAddTranslation() {
    let dialogRef = this.dialog.open(DialogAddTranslationComponent, {
      data: null,
      panelClass: 'dialog-medium'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

}
