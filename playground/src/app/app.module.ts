import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AlxPrintModule} from 'al00x/printer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AlxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
