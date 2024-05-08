import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ScreenDetectorService} from "@al00x/screen-detector";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    JsonPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public screenDetector = inject(ScreenDetectorService);

  result = signal<string | undefined>(undefined);
  values = {
    xl: 'XL enough to fit anything',
    md: "Medium Enough to reach!",
    sm: "So much pain of being one-hand held"
  };

  getValue() {
    this.result.set(this.screenDetector.select(this.values) ?? "I'm smol enough to fit in a mouse hole (Below SM)")
  }
}
