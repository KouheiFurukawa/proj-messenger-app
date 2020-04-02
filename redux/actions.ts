import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

interface ParamsSendMessage {
    user_from: string;
    user_to: string;
    text: string;
    send_date: string;
}

export const getFriends = actionCreator.async<string, any[], Error>('ACTIONS_GET_FRIENDS');
export const getMessages = actionCreator.async<{ user1: string; user2: string }, any[], Error>('ACTIONS_GET_MESSAGES');
export const getLoginInfo = actionCreator.async<{}, any, Error>('ACTIONS_GET_LOGIN_INFO');
export const sendMessage = actionCreator.async<ParamsSendMessage, any, Error>('ACTIONS_SEND_MESSAGE');

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
    requestGetLoginInfo: getLoginInfo.started,
    failureGetLoginInfo: getLoginInfo.failed,
    successGetLoginInfo: getLoginInfo.done,
    changeDisplayNameInput: actionCreator<string>('ACTIONS_CHANGE_DISPLAY_NAME_INPUT'),
    changeChatFriend: actionCreator<{ id: string; displayName: string }>('ACTIONS_CHANGE_CHAT_FRIEND'),
    requestSendMessage: sendMessage.started,
    failureSendMessage: sendMessage.failed,
    successSendMessage: sendMessage.done,
    clearState: actionCreator<void>('ACTION_CREATE_STATE'),
};
