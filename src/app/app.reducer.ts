import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromExhibition from './exhibitions/exhibitions.reducer'

export interface GlobalState {
  ui: fromUI.UIState,
  auth: fromAuth.AuthState,
  exposition: fromExhibition.ExhibitionState
}

export const reducers: ActionReducerMap<GlobalState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  exposition: fromExhibition.exhibitionReducer
}

export const getUiState = createFeatureSelector<fromUI.UIState>('ui');

export const getIsSidenavOpen = createSelector(getUiState, fromUI.getIsSidenavOpen);
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);
export const getSelectedLanguage = createSelector(getUiState, fromUI.getSelectedLanguage);
export const getOpeningHours = createSelector(getUiState, fromUI.getOpeningHours);
export const getIsShowcaseActive = createSelector(getUiState, fromUI.getIsShowcaseActive);
export const getIsDinnerOrLunchOrSnacks = createSelector(getUiState, fromUI.getSelectedLink)



export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth)
export const getUserEmail = createSelector(getAuthState, fromAuth.getUserEmail);
export const getIsAdmin = createSelector(getAuthState, fromAuth.getIsAdmin);

export const getExhibitionState = createFeatureSelector<fromExhibition.ExhibitionState>('exposition');
export const getExpositionId = createSelector(getExhibitionState, fromExhibition.getExhibitionId);
