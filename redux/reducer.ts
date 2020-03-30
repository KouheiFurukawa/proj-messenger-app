import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actions } from './actions';

export interface State {
    tabValue: number;
    textInput: string;
    userSearchInput: string;
    friends: any[];
    messages: any[];
    idInput: string;
    passwordInput: string;
    loginDisplayMode: string;
}

export const initialState: State = {
    tabValue: 0,
    textInput: '',
    userSearchInput: '',
    friends: [],
    messages: [],
    idInput: '',
    passwordInput: '',
    loginDisplayMode: 'button',
};

export const reducer = reducerWithInitialState(initialState)
    .case(actions.changeTab, (state, tabValue) => {
        return { ...state, tabValue };
    })
    .case(actions.updateTextInput, (state, textInput) => {
        return { ...state, textInput };
    })
    .case(actions.updateUserSearchInput, (state, userSearchInput) => {
        return { ...state, userSearchInput };
    })
    .case(actions.successGetFriends, (state, action) => {
        return { ...state, friends: action.result };
    })
    .case(actions.successGetMessages, (state, action) => {
        return { ...state, messages: action.result };
    })
    .case(actions.changeIdInput, (state, action) => {
        return { ...state, idInput: action };
    })
    .case(actions.changePasswordInput, (state, action) => {
        return { ...state, passwordInput: action };
    })
    .case(actions.changeLoginDisplayMode, (state, action) => {
        return { ...state, loginDisplayMode: action };
    });
