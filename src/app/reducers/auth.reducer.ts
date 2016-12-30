import * as auth from 'app/actions/auth.actions';

export interface State {
    isAuthenticated: boolean;
    access_token: string;
}

const initialState: State = {
    isAuthenticated: false,
    access_token: null
};

export function reducer(state = initialState, action: auth.Actions): State {
    switch(action.type) {
        case auth.ActionTypes.LOGIN_SUCCESS: {
            return { isAuthenticated: true, access_token: action.payload };
        }

        default: {
            return state;
        }
    }
}

export const getAuthStatus = (state: State) => state.isAuthenticated;