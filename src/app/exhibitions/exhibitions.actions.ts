import { Action } from "@ngrx/store";

// export const SET_EXPOSITION = '[EXPO] Set Exhibition';
export const CLEAR_EXPOSITION = '[EXPO] Clear Exhibition';
export const SET_EXHIBITION_ID = '[EXPO] Set Exhibition Id'

// export class SetExposition implements Action {
//   readonly type = SET_EXPOSITION;
//   constructor(public expositionId: string) {}
// }
export class SetExhibitionId implements Action {
  readonly type = SET_EXHIBITION_ID;
  constructor (public exhibitionId: string) {}
}

export class ClearExposition implements Action {
  readonly type = CLEAR_EXPOSITION;
}

export type ExhibitionActions =
  // SetExposition | 
  ClearExposition | 
  SetExhibitionId