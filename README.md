

# @Al00X/Screen-Detector
> 🖨️ _Get your device screen type reactively!_ in Angular.


## ✅ Setup:
Install using your preferred package manager:

    npm i @al00x/screen-detector

## ✨ Usage:
`ScreenDetectorService` it's all you need!

```html
<div *NgIf="screenDetector.isDesktop$ | async">
  Render when reached desktop breakpoint
</div>

<!-- The below *NgIf condition, it's always true -->
<ng-container *NgIf="{state: screenDetector.state$ | async} as screen">
  XL Breakpoint? {{ screen.xl ? 'YES' : 'NO'}}
</ng-container>
```

There's 6: `xxl, xl, lg, md, sm, xs` breakpoint types, also with utility: `isDesktop` which is defaulted as `lg` and it's changeable.

You can also check the example files for various usages: [Playground](playground/src/app)

### ⚙️ Config:
You can config screen detector for more customization by providing `ALX_SCREEN_DETECTOR_CONFIG`.

```ts
// component.ts

@Component({
  ...,
  providers: [
    {
      provide: ALX_SCREEN_DETECTOR_CONFIG,
      useValue: {
        ...,
        // The breakpoints below are the default values that are the same as default TailwindCSS breakpoints.
        breakpoints: {
          xxl: 1536,
          xl: 1280,
          lg: 1024,
          md: 768,
          sm: 640,
          xs: 420,
        }
      } as AlxScreenDetectorConfig
    }
  ],
})
export class Component { }
```

#### Config Options:

| property                                                          | default               | description                                                                                                        |
|-------------------------------------------------------------------|-----------------------|--------------------------------------------------------------------------------------------------------------------|
| `desktopBreakpoint: 'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'` | 'lg' | You can set at which breakpoint is considered as desktop                                                           |
| `resizeDebounceTime: number`                                      | 25                    | Screen resize event debounce time in milliseconds; Shorter values cause a faster detection but reduced performance |
| `breakpoints: BreakpointsConfig`                                  | *In the example above* | Describe each breakpoint's pixels                                                                                  |


