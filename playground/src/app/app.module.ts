import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {ALX_SCREEN_DETECTOR_CONFIG, AlxScreenDetectorConfig} from "al00x/screen-detector";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    { provide: ALX_SCREEN_DETECTOR_CONFIG, useValue: {
      breakpoints: {
        xxl: 1700,
        xl: 1300,
        lg: 1100,
        md: 500,
        sm: 300,
      }
      } as AlxScreenDetectorConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
