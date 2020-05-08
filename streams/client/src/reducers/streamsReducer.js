import _ from 'lodash';
import * as types from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case types.CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case types.DELETE_STREAM:
            // Would not work
            // return {...state, [action.payload]: undefined}
            return _.omit(state, action.payload);
        case types.EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case types.FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case types.FETCH_STREAMS:
            // convert array from API to object to maintain type (see state={} argument)
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        default:
            return state;
    }
};
