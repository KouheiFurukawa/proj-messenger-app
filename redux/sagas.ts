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

export function* sagas() {
    yield fork(getFriendsHandler);
    yield fork(getMessagesHandler);
}
