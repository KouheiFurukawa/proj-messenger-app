import { call, fork, put, take, all } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { actions } from './actions';
import ApiClient from '../src/ApiClient';
import io from 'socket.io-client';

function createSocketConnection(id: string) {
    const socket = io('http://localhost:3000');

    return new Promise((resolve) => {
        socket.on('connect', () => {
            socket.emit('setUserName', id);
            resolve(socket);
        });
    });
}

function subscribe(socket: any) {
    return eventChannel((emit) => {
        const syncMessage = async (message: any) => {
            emit(actions.successSyncMessage({ result: message, params: message }));
        };

        socket.on('syncMessage:receive', syncMessage);

        return () => {
            socket.off('syncMessage:receive', syncMessage);
        };
    });
}

function* initSocketHandler() {
    while (true) {
        try {
            const { payload } = yield take('ACTIONS_INIT_SOCKET');
            const socket = yield call(createSocketConnection, payload);
            yield fork(subscribeHandler, socket);
            yield fork(syncMessageHandler, socket);
        } catch (err) {
            throw err;
        }
    }
}

function* subscribeHandler(socket: any) {
    const channel = yield call(subscribe, socket);

    while (true) {
        const action = yield take(channel);

        yield put(action);
    }
}

function* syncMessageHandler(socket: any) {
    while (true) {
        const { payload } = yield take('ACTIONS_SYNC_MESSAGE_STARTED');
        socket.emit('updateMessage', payload);
    }
}

function* getFriendsHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_GET_FRIENDS_STARTED');
        const { result, error } = yield call(ApiClient.getFriend);
        if (result && !error) {
            yield put(actions.successGetFriends({ result, params: '' }));
        } else {
            yield put(actions.failureGetFriends({ error, params: '' }));
        }
    }
}

function* getMessagesHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_GET_MESSAGES_STARTED');
        const { result, error } = yield call(ApiClient.getMessage, payload);
        if (result && !error) {
            yield put(actions.successGetMessages({ result, params: payload }));
        } else {
            yield put(actions.failureGetFriends({ error, params: payload }));
        }
    }
}

function* getLoginInfoHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_GET_LOGIN_INFO_STARTED');
        const { result, error } = yield call(ApiClient.getLoginInfo);
        if (result && !error) {
            yield put(actions.successGetLoginInfo({ result, params: payload }));
            yield put(actions.requestGetFriends(result.id));
        } else {
            window.location.href = `${window.location.href}login`;
            yield put(actions.failureGetLoginInfo({ error, params: payload }));
        }
    }
}

function* sendMessageHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_SEND_MESSAGE_STARTED');
        const { result, error } = yield call(ApiClient.sendMessage, payload);
        if (result && !error) {
            yield put(actions.successSendMessage({ result, params: payload }));
            yield put(actions.requestSyncMessage(payload));
        } else {
            yield put(actions.failureSendMessage({ error, params: payload }));
        }
    }
}

function* searchUserHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_SEARCH_USER_STARTED');
        const { result, error } = yield call(ApiClient.searchUser, payload);
        if (result && !error) {
            yield put(actions.successSearchUser({ result, params: payload }));
        } else {
            yield put(actions.failureSearchUser({ error, params: payload }));
        }
    }
}

function* registerFriendHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_REGISTER_FRIEND_STARTED');
        const { result, error } = yield call(ApiClient.registerFriend, payload);
        if (result && !error) {
            yield put(actions.successRegisterFriend({ result, params: payload }));
        } else {
            yield put(actions.failureRegisterFriend({ error, params: payload }));
        }
    }
}

export function* sagas() {
    yield fork(getFriendsHandler);
    yield fork(getMessagesHandler);
    yield fork(getLoginInfoHandler);
    yield fork(sendMessageHandler);
    yield fork(searchUserHandler);
    yield fork(registerFriendHandler);
    yield fork(initSocketHandler);
}
