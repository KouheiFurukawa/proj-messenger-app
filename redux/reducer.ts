import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actions } from './actions';

export interface State {
    tabValue: number;
    textInput: string;
    userSearchInput: string;
    friends: any[];
    messages: any[];
}

export const initialState: State = {
    tabValue: 0,
    textInput: '',
    userSearchInput: '',
    friends: [],
    messages: [],
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
    });
