

# @Al00X/Screen-Detector
> 🖨️ _Get your device screen type reactively!_ in Angular.


## ✅ Setup:
Install using your preferred package manager:

    npm i @al00x/screen-detector

## ✨ Usage:
`ScreenDetectorService` it's what you need!

```html
<div *ngIf="screenDetector.isDesktop$ | async">
  Render when reached desktop breakpoint
</div>

<!-- The below *ngIf condition, it's always true -->
<ng-container *ngIf="{isXL: screenDetector.xl$ | async} as device">
  XL Breakpoint? {{ device.isXL ? 'YES' : 'NO'}}
</ng-container>
```
There's 5 different breakpoint types, also with `isDesktop`.

### ⚙️ Config:
You can config screen detector for more customization by providing `ALX_SCREEN_DETECTOR_CONFIG` in **AppModule**.

```ts
// app.module.ts

@NgModule({
  ...,
  providers: [
    {
      provide: ALX_SCREEN_DETECTOR_CONFIG,
      useValue: {
        ...,
        // The breakpoints below are the default values that are the same as default tailwind breakpoints.
        breakpoints: {
          xxl: 1536,
          xl: 1280,
          lg: 1024,
          md: 768,
          sm: 640,
        }
      } as AlxScreenDetectorConfig
    }
  ],
})
export class AppModule { }
```

#### Config Options:

| property | default | description |
|--|--|--|
| `desktopBreakpoint: 'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm'`  | 'lg' | You can set at which breakpoint, the screen is considered as desktop |
| `resizeDebounceTime: number`  | 25 | Screen resize event debounce time in milliseconds **(affects performance)** |
| `desktopBreakpoint: AlXScreenDetectorBreakpoints`  | *In the example above* | Describe each breakpoint's pixels |


