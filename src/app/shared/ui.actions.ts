import { Action } from '@ngrx/store';

export const OPEN_SIDENAV = '[UI] Open Sidenav';
export const CLOSE_SIDENAV = '[UI] Close Sidenav';
export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';
export const SELECTED_LANGUAGE = '[ui] Selected Language';
export const SET_OPENING_HOURS = '[UI] Set Opening Hours';
export const SHOWCASE_ACTIVE = '[UI] Showcase Active';
export const SELECTED_LINK = '[UI] Selected link';


export class OpenSidenav implements Action {
  readonly type = OPEN_SIDENAV; 
}

export class CloseSidenav implements Action {
  readonly type = CLOSE_SIDENAV
}

export class StartLoading implements Action {
  readonly type = START_LOADING
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING
}
export class SelectedLanguage implements Action {
  readonly type = SELECTED_LANGUAGE
  constructor(public payload: string) {}
}
export class SetOpeningHours implements Action {
  readonly type = SET_OPENING_HOURS
  constructor(public payload: object) {}
}
export class ShowcaseActive implements Action {
  readonly type = SHOWCASE_ACTIVE
  constructor(public payload: boolean) {}
}
export class SelectedLink implements Action {
  readonly type = SELECTED_LINK
  constructor(public payload: string) {}
}



export type UIActions =
  OpenSidenav | 
  CloseSidenav | 
  StartLoading | 
  StopLoading | 
  SelectedLanguage | 
  SetOpeningHours |
  ShowcaseActive |
  SelectedLink
  