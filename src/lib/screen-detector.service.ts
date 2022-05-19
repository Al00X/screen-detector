import {Inject, Injectable, InjectionToken, OnDestroy, Optional} from '@angular/core';
import {BehaviorSubject, debounceTime, fromEvent, Subscription} from 'rxjs';

type BreakpointKeys = 'xxl' | 'xl' | 'lg' | 'md' | 'sm';
export type AlXScreenDetectorBreakpoints = {[key in BreakpointKeys]: number};
export interface AlxScreenDetectorConfig {
  resizeDebounceTime?: number;
  desktopBreakpoint?: BreakpointKeys;
  breakpoints?: AlXScreenDetectorBreakpoints;
}

export const ALX_SCREEN_DETECTOR_CONFIG = new InjectionToken('Config for AlX Screen Detector package');

/* The default breakpoints are the same as TailwindCSS sizes */
const DEFAULT_BREAKPOINTS: AlXScreenDetectorBreakpoints = {
  xxl: 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
}
const DEFAULT_DESKTOP_BREAKPOINT = 'lg';
const DEFAULT_RESIZE_DEBOUNCE_TIME = 25;

@Injectable({
  providedIn: 'root',
})
export class ScreenDetectorService implements OnDestroy {
  public xxl$ = new BehaviorSubject<boolean>(false);
  public xl$ = new BehaviorSubject<boolean>(false);
  public lg$ = new BehaviorSubject<boolean>(false);
  public md$ = new BehaviorSubject<boolean>(false);
  public sm$ = new BehaviorSubject<boolean>(false);
  public isDesktop$ = new BehaviorSubject<boolean>(false);

  private resizeSub$: Subscription;
  private readonly breakpoints: AlXScreenDetectorBreakpoints;
  private readonly desktopBreakpointKey: BreakpointKeys;
  private readonly resizeDebounceTime: number;

  constructor(@Optional() @Inject(ALX_SCREEN_DETECTOR_CONFIG) private config?: AlxScreenDetectorConfig) {
    this.breakpoints = config?.breakpoints ?? DEFAULT_BREAKPOINTS;
    this.desktopBreakpointKey = config?.desktopBreakpoint ?? DEFAULT_DESKTOP_BREAKPOINT;
    this.resizeDebounceTime = config?.resizeDebounceTime ?? DEFAULT_RESIZE_DEBOUNCE_TIME;

    this.resizeSub$ = fromEvent(window, 'resize').pipe(debounceTime(this.resizeDebounceTime)).subscribe(() => {
      this.updateState();
    });
    this.updateState();
  }

  private updateState() {
    const screenWidth = window.innerWidth;
    this.sm$.next(screenWidth >= this.breakpoints.sm);
    this.md$.next(screenWidth >= this.breakpoints.md);
    this.lg$.next(screenWidth >= this.breakpoints.lg);
    this.xl$.next(screenWidth >= this.breakpoints.xl);
    this.xxl$.next(screenWidth >= this.breakpoints.xxl);

    this.isDesktop$.next(screenWidth >= this.breakpoints[this.desktopBreakpointKey]);
  }

  ngOnDestroy() {
    this.resizeSub$.unsubscribe();
  }
}
