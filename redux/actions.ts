import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const getFriends = actionCreator.async<string, any[], Error>('ACTIONS_GET_FRIENDS');
export const getMessages = actionCreator.async<{ user1: string; user2: string }, any[], Error>('ACTIONS_GET_MESSAGES');

export const actions = {
    changeTab: actionCreator<number>('ACTIONS_CHANGE_TAB'),
    updateTextInput: actionCreator<string>('ACTIONS_UPDATE_TEXT_INPUT'),
    updateUserSearchInput: actionCreator<string>('ACTIONS_UPDATE_SEARCH_INPUT'),
    requestGetFriends: getFriends.started,
    failureGetFriends: getFriends.failed,
    successGetFriends: getFriends.done,
    requestGetMessages: getMessages.started,
    failureGetMessages: getMessages.failed,
    successGetMessages: getMessages.done,
    changeIdInput: actionCreator<string>('ACTIONS_CHANGE_ID_INPUT'),
    changePasswordInput: actionCreator<string>('ACTIONS_CHANGE_PASSWORD_INPUT'),
    changeLoginDisplayMode: actionCreator<string>('ACTIONS_CHANGE_DISPLAY_MODE'),
};
