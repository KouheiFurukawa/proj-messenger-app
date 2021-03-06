import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

interface ParamsSendMessage {
    user_from: string;
    user_to: string;
    text: string;
    send_date: string;
}

interface ParamsRegisterFriend {
    user_id: string;
    friend_id: string;
    user_icon_url: string;
    friend_icon_url: string;
}

export const getFriends = actionCreator.async<string, any[], Error>('ACTIONS_GET_FRIENDS');
export const getMessages = actionCreator.async<{ user1: string; user2: string }, any[], Error>('ACTIONS_GET_MESSAGES');
export const getLoginInfo = actionCreator.async<{}, any, Error>('ACTIONS_GET_LOGIN_INFO');
export const sendMessage = actionCreator.async<ParamsSendMessage, any, Error>('ACTIONS_SEND_MESSAGE');
export const searchUser = actionCreator.async<string, any, Error>('ACTIONS_SEARCH_USER');
export const registerFriend = actionCreator.async<ParamsRegisterFriend, any, Error>('ACTIONS_REGISTER_FRIEND');
export const syncMessage = actionCreator.async<any, any, Error>('ACTIONS_SYNC_MESSAGE');
export const restoreMessage = actionCreator.async<{ id: string; displayName: string }, any, Error>(
    'ACTIONS_RESTORE_MESSAGE',
);
export const updateIcon = actionCreator.async<{ file: File; id: string }, any, Error>('ACTIONS_UPDATE_ICON');
export const deleteFriends = actionCreator.async<{ userId: string; friends: string[] }, any, Error>(
    'ACTIONS_DELETE_FRIENDS',
);

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
    changeChatFriend: actionCreator<{ id: string; displayName: string; iconUrl: string }>('ACTIONS_CHANGE_CHAT_FRIEND'),
    requestSendMessage: sendMessage.started,
    failureSendMessage: sendMessage.failed,
    successSendMessage: sendMessage.done,
    clearState: actionCreator<void>('ACTION_CREATE_STATE'),
    requestSearchUser: searchUser.started,
    failureSearchUser: searchUser.failed,
    successSearchUser: searchUser.done,
    requestRegisterFriend: registerFriend.started,
    failureRegisterFriend: registerFriend.failed,
    successRegisterFriend: registerFriend.done,
    requestSyncMessage: syncMessage.started,
    failureSyncMessage: syncMessage.failed,
    successSyncMessage: syncMessage.done,
    initSocket: actionCreator<string>('ACTIONS_INIT_SOCKET'),
    requestRestoreMessage: restoreMessage.started,
    requestUpdateIcon: updateIcon.started,
    failureUpdateIcon: updateIcon.failed,
    successUpdateIcon: updateIcon.done,
    changeEditFriend: actionCreator<void>('ACTIONS_CHANGE_EDIT_FRIEND'),
    checkFriend: actionCreator<string>('ACTIONS_CHECK_FRIEND'),
    uncheckFriend: actionCreator<string>('ACTIONS_UNCHECK_FRIEND'),
    requestDeleteFriends: deleteFriends.started,
    failureDeleteFriends: deleteFriends.failed,
    successDeleteFriends: deleteFriends.done,
};
