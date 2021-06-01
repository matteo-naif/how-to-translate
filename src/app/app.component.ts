import { Component } from '@angular/core';
import { TranslateService } from './commons/services/translate.service';
import { UtilService } from './commons/services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translateService: TranslateService,
    private utilService: UtilService,
  ) {
    this.fetchData();
  }

  fetchData(){
    let values = this.utilService.getItem(this.translateService.localStorageKey);

    if(!values){
      values = this.translateService.initialDictionary;
    }

    this.translateService.setCurrentValues(values);
  }


}
