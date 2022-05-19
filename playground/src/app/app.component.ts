import { Component } from '@angular/core';
import {ScreenDetectorService} from "al00x/screen-detector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'playground';
  constructor(public screenDetector: ScreenDetectorService) {
  }
}
