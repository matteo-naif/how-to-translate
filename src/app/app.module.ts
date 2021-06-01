import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogDictionaryComponent } from './widget/dialog-dictionary/dialog-dictionary.component';
import { TitleComponent } from './widget/title/title.component';
import { DialogAddTranslationComponent } from './widget/dialog-add-translation/dialog-add-translation.component';
import { MainComponent } from './main/main.component';
import { AsideComponent } from './aside/aside.component';
import { SideComponent } from './side/side.component';

// material
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    DialogDictionaryComponent,
    TitleComponent,
    DialogAddTranslationComponent,
    MainComponent,
    AsideComponent,
    SideComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // Material
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogDictionaryComponent]
})
export class AppModule { }
