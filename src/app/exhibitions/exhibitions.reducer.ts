import {
  ExhibitionActions,
  // SET_EXHIBITION,
  // CLEAR_EXPOSITION,
  SET_EXHIBITION_ID
} from './exhibitions.actions';

export interface ExhibitionState {
  // expositionId: string;
  exhibitionId: string
}

const initialState: ExhibitionState = {
  // expositionId: 'bloekenblal',
  exhibitionId: 'exposition-jazzsession'
}

export function exhibitionReducer(state = initialState, action: ExhibitionActions) {
  switch(action.type) {
    // case SET_EXPOSITION:
    //   return {
    //     ...state,
    //     expositionId: action.exhibitionId
    //   };
    // case CLEAR_EXPOSITION:
    //   return {
    //     ...state,
    //     expositionId: null
    //   };
    case SET_EXHIBITION_ID:
      return {
        ...state,
        exhibitionId: action.exhibitionId
      }
    default: 
      return {
        ...state
      }
  }
}

export const getExhibitionId = (state: ExhibitionState) => state.exhibitionId;
// export const clearExposition = (state: ExpositionState) => state.expositionId = null;