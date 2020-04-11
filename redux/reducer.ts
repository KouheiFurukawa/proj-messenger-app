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
        iconUrl: string;
    };
    chatFriend: {
        displayName: string;
        id: string;
        iconUrl: string;
    };
    searchResult: {
        displayName: string;
        id: string;
        iconUrl: string;
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
        iconUrl: '',
    },
    chatFriend: {
        displayName: '',
        id: '',
        iconUrl: '',
    },
    searchResult: {
        displayName: '',
        id: '',
        iconUrl: '',
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
            const userIconUrl = friend.user_icon_url;
            const friendIconUrl = friend.friend_icon_url;
            if (userId !== state.loginInfo.id) {
                friend.user_id = friendId;
                friend.friend_id = userId;
                friend.user_icon_url = friendIconUrl;
                friend.friend_icon_url = userIconUrl;
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
        return {
            ...state,
            loginInfo: { id: action.result.id, displayName: action.result.displayName, iconUrl: action.result.iconUrl },
        };
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
    })
    .case(actions.successSearchUser, (state, action) => {
        const searchResult: State['searchResult'] = {
            id: action.result[0].user_id,
            displayName: action.result[0].display_name,
            iconUrl: action.result[0].icon_url,
        };
        return { ...state, searchResult, userSearchInput: initialState.userSearchInput };
    })
    .case(actions.successRegisterFriend, (state, action) => {
        const newFriends: State['friends'] = state.friends.concat({ ...action.params, id: state.friends.length + 1 });
        return { ...state, friends: newFriends, searchResult: initialState.searchResult };
    })
    .case(actions.successSyncMessage, (state, action) => {
        const newMessages: State['messages'] = state.messages.concat({
            ...action.params,
            id: state.messages.length + 1,
        });
        return { ...state, messages: newMessages };
    })
    .case(actions.successUpdateIcon, (state, action) => {
        const newLoginInfo = { ...state.loginInfo, iconUrl: action.result };
        return { ...state, loginInfo: newLoginInfo };
    });
