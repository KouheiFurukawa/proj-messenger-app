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
    displayNameInput: string;
    loginDisplayMode: string;
    loginInfo: {
        displayName: string;
        id: string;
    };
    chatFriend: {
        displayName: string;
        id: string;
    };
}

export const initialState: State = {
    tabValue: 0,
    textInput: '',
    userSearchInput: '',
    friends: [],
    messages: [],
    idInput: '',
    passwordInput: '',
    displayNameInput: '',
    loginDisplayMode: 'button',
    loginInfo: {
        displayName: '',
        id: '',
    },
    chatFriend: {
        displayName: '',
        id: '',
    },
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
        const friends = action.result;
        friends.forEach((friend) => {
            const userId = friend.user_id;
            const friendId = friend.friend_id;
            if (userId !== state.loginInfo.id) {
                friend.user_id = friendId;
                friend.friend_id = userId;
            }
        });
        return { ...state, friends };
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
    })
    .case(actions.successGetLoginInfo, (state, action) => {
        return { ...state, loginInfo: { id: action.result.id, displayName: action.result.displayName } };
    })
    .case(actions.changeDisplayNameInput, (state, action) => {
        return { ...state, displayNameInput: action };
    })
    .case(actions.changeChatFriend, (state, action) => {
        return { ...state, chatFriend: action };
    })
    .case(actions.successSendMessage, (state, action) => {
        const newMessages: State['messages'] = state.messages.concat({
            ...action.params,
            id: state.messages.length + 1,
        });
        return { ...state, messages: newMessages, textInput: '' };
    })
    .case(actions.clearState, (state) => {
        return initialState;
    });
