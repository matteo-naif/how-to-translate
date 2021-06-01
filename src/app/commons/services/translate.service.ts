import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { DictionaryModel, TranslationModel } from '../models/object.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  public localStorageKey = 'how-to-translate';

  valuesChanged = new BehaviorSubject<DictionaryModel>(new DictionaryModel());

  /**
   * In this object I store temporary data
   */
  private _currentValues: DictionaryModel = new DictionaryModel();

  /**
   * Setter that fire the BehaviorSubject so anyone know when happens
   * @param currentValues
   */
  public setCurrentValues(currentValues: DictionaryModel){
    this._currentValues = currentValues;
    this.utilService.saveItem(this.localStorageKey, this._currentValues);
    this.valuesChanged.next(this._currentValues);
  }

  public getCurrentValues(){
    return this._currentValues;
  }

  /**
   * This is the default object if there is nothing in local storage
   */
  initialDictionary: DictionaryModel = {
    values: [
      {
        it: 'pianta',
        en: 'plant'
      },
      {
        it: 'acqua',
        en: 'water'
      },
      {
        it: 'cielo',
        en: 'sky'
      }
    ]
  }

  translationListColors: TranslationModel[] =
  [
    {
      it: 'rosso',
      en: 'red'
    },
    {
      it: 'giallo',
      en: 'yellow'
    },
    {
      it: 'blu',
      en: 'blue'
    }
  ];

  translationListAnatomy: TranslationModel[] =
  [
    {
      it: 'faccia',
      en: 'face'
    },
    {
      it: 'mano',
      en: 'hand'
    },
    {
      it: 'piedi',
      en: 'feet'
    }
  ];

  translationListGreetings: TranslationModel[] =
  [
    {
      it: 'ciao',
      en: 'hello'
    },
    {
      it: 'arrivederci',
      en: 'bye'
    },
    {
      it: 'buongiorno',
      en: 'good morning'
    }
  ];

  constructor(private utilService: UtilService){

  }


  /**
   * Funzione che controlla se nella lista ci sono già parole presenti nel dizionario
   * @param dictionary lista di parole che si vogliono aggiungere
   * @returns lista di parole escluse quelle già presenti
   */
  getFilteredList(dictionary: TranslationModel[]) : TranslationModel[] {

    const res: TranslationModel[] = [];

    for(let i = 0; i < dictionary.length; i++){
      let wordIsAlreadyIn = false;
      const word = dictionary[i];

      for(let j = 0; j < this._currentValues.values.length; j++){
        const wordIn = this._currentValues.values[j];

        if(wordIn.it === word.it && wordIn.en === word.en){
          wordIsAlreadyIn = true;
          break;
        }
      }

      if(!wordIsAlreadyIn){
        res.push(word);
      }

    }

    return res;
  }

  deleteTranslation(el: TranslationModel): boolean{
    let found = false;

    for(let i = 0; i < this._currentValues.values.length; i++){

      const currentItem = this._currentValues.values[i];

      if(currentItem.it === el.it && currentItem.en === el.en){
        this._currentValues.values.splice(i, 1);
        this.setCurrentValues(this._currentValues);
        found = true;
        break;
      }
    }

    return found;

  }

}
