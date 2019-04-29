import * as actions from './actions';
import {
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants.js';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { getNativeFetch } from 'fetch-mock/src/lib/fetch-handler';

const fetchMock = require('fetch-mock');
const mockStore = configureMockStore([thunkMiddleware])

afterEach(() => {
    fetchMock.restore();
})

const mockServiceCreator = (body, succeeds = true) => () =>
    new Promise((resolve, reject) => {
        setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10)
    })

it('should create an action to search robots', () => {
    const text = 'wooo';
    const expectedAction = {
        type: CHANGE_SEARCH_FIELD,
        payload: text
    }

    expect(actions.setSearchField(text)).toEqual(expectedAction);
})

it('handles requesting robots api', () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots())
    const action = store.getActions();
    const expectedAction = {
        type: REQUEST_ROBOTS_PENDING
    }
    expect(action[0]).toEqual(expectedAction);
})

it('handles success robots ', () => {
    fetch = jest.fn()
        .mockReturnValue(Promise.resolve(['some user']))
    const store = mockStore({ users: [] });
    const expectedAction = {
        type: REQUEST_ROBOTS_SUCCESS,
        payload: ['some user']
    };
    expect.assertions(1);
    return store.dispatch(actions.requestRobots())
        .then(() => {
            const action = store.getActions();
            expect(action[1]).toEqual(expectedAction)
    })
})

it('handles error robots', () => {
    const store = mockStore({ error: '' });
    const expectedAction = {
        type: REQUEST_ROBOTS_FAILED,
        payload: 'error'
    }
    // expect.assertions(1);
    return store.dispatch(actions.requestRobots())
        .catch(() => {
            const action = store.getActions();
            console.log(action);
        })
})