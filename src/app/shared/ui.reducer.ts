
import * as fromUI from './ui.actions';


export interface UIState {
  isLoading: boolean;
}

const estadoInical: UIState = {
  isLoading: false
};

export function uiReducer( state = estadoInical, accion: fromUI.acciones ) {
    switch ( accion.type ) {
      case fromUI.ACTIVAR_LOADING:
          return {
            isLoading: true
          };

      case fromUI.DESACTIVAR_LOADING:
        return {
          isLoading: false
        };

      default:
        return state;
    }
}
