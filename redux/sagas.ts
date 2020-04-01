import { call, put, fork, take } from 'redux-saga/effects';
import { actions } from './actions';
import ApiClient from '../src/ApiClient';

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
            window.location.href = 'http://localhost:8080/login';
            yield put(actions.failureGetLoginInfo({ error, params: payload }));
        }
    }
}

export function* sagas() {
    yield fork(getFriendsHandler);
    yield fork(getMessagesHandler);
    yield fork(getLoginInfoHandler);
}
