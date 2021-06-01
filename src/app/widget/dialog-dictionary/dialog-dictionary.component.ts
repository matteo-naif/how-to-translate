import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TranslateService } from '../../commons/services/translate.service';
import { DictionaryModel, TranslationModel } from '../../commons/models/object.model';
import { MatTableDataSource } from '@angular/material/table';
import { UtilService } from '../../commons/services/util.service';

@Component({
  selector: 'app-dialog-dictionary',
  templateUrl: './dialog-dictionary.component.html',
  styleUrls: ['./dialog-dictionary.component.scss']
})
export class DialogDictionaryComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentObject: DictionaryModel = {
    values: []
  };

  // tabella
  displayedColumns: string[] = ['it', 'en', 'actions'];
  dataSource = new MatTableDataSource(this.currentObject.values);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any = {},
    private translateService: TranslateService,
    private utilService: UtilService
  ) {

    this.subscription = this.translateService.valuesChanged
      .subscribe((val: DictionaryModel) => {
        console.log(val);
        this.currentObject = val;
        this.dataSource = new MatTableDataSource(this.currentObject.values);
      });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteTranslation(el: TranslationModel){
    let response = this.translateService.deleteTranslation(el);

    if(response){
      this.utilService.openSnackBar('Parola cancellata');
    } else {
      this.utilService.openSnackBar('Parola non trovata');
    }
  }

}
