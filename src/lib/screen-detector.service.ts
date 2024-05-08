import {Inject, Injectable, InjectionToken, OnDestroy, Optional} from '@angular/core';
import {BehaviorSubject, debounceTime, fromEvent, Subscription} from 'rxjs';

type BreakpointKeys = 'xxl' | 'xl' | 'lg' | 'md' | 'sm';
export type BreakpointsConfig = {[key in BreakpointKeys]: number};
export interface AlxScreenDetectorConfig {
  resizeDebounceTime?: number;
  desktopBreakpoint?: BreakpointKeys;
  breakpoints?: BreakpointsConfig;
}

export const ALX_SCREEN_DETECTOR_CONFIG = new InjectionToken('Config for AlX Screen Detector package');

/* The default breakpoints are the same as TailwindCSS sizes */
const DEFAULT_BREAKPOINTS: BreakpointsConfig = {
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
  public state$ = new BehaviorSubject<{[key in BreakpointKeys | 'isDesktop']: boolean}>({
    xxl: false,
    xl: false,
    lg: false,
    md: false,
    sm: false,
    isDesktop: false,
  });
  public current$ = new BehaviorSubject<BreakpointKeys | undefined>(undefined);

  private resizeSub$: Subscription;
  private readonly breakpoints: BreakpointsConfig;
  private readonly sortedBreakpointsEntry: [BreakpointKeys, number][];
  private readonly desktopBreakpointKey: BreakpointKeys;
  private readonly resizeDebounceTime: number;

  constructor(@Optional() @Inject(ALX_SCREEN_DETECTOR_CONFIG) private config?: AlxScreenDetectorConfig) {
    this.breakpoints = config?.breakpoints ?? DEFAULT_BREAKPOINTS;
    this.sortedBreakpointsEntry = Object.entries(this.breakpoints).sort((a, b) => a[1] < b[1] ? 1 : -1) as any;
    this.desktopBreakpointKey = config?.desktopBreakpoint ?? DEFAULT_DESKTOP_BREAKPOINT;
    this.resizeDebounceTime = config?.resizeDebounceTime ?? DEFAULT_RESIZE_DEBOUNCE_TIME;

    this.resizeSub$ = fromEvent(window, 'resize').pipe(debounceTime(this.resizeDebounceTime)).subscribe(() => {
      this.updateState();
    });
    this.updateState();
  }

  public select<T>(values: {[p in BreakpointKeys]?: T}) {
    if (!this.current$.value) return undefined;

    const currentBreakpointWidth = this.breakpoints[this.current$.value];

    for(const key of this.sortedBreakpointsEntry.filter(t => currentBreakpointWidth >= t[1]).map(t => t[0])) {
      const value = values[key];
      if (value) return value;
    }

    return undefined;
  }

  private updateState() {
    const screenWidth = window.innerWidth;
    const state: any = {};
    let current: BreakpointKeys | undefined = undefined;

    for(const [key, width] of this.sortedBreakpointsEntry) {
      state[key] = screenWidth >= width;
      if (!current && state[key]) {
        current = key;
      }
    }

    this.sm$.next(state['sm']);
    this.md$.next(state['md']);
    this.lg$.next(state['lg']);
    this.xl$.next(state['xl']);
    this.xxl$.next(state['xxl']);

    this.isDesktop$.next(state[this.desktopBreakpointKey]);

    this.current$.next(current);

    this.state$.next({
      ...state,
      isDesktop: this.isDesktop$.value,
    })
  }

  ngOnDestroy() {
    this.resizeSub$.unsubscribe();
  }
}
