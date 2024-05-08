import { ApplicationConfig } from '@angular/core';
import {ALX_SCREEN_DETECTOR_CONFIG, AlxScreenDetectorConfig} from "@al00x/screen-detector";

export const appConfig: ApplicationConfig = {
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
};
