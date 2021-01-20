import {ADD_TOMATO} from '../actionTypes';
// eslint-disable-next-line
export default (state: any[] = [], action: any) => {
    switch (action.type) {
        case ADD_TOMATO:
            return [action.payload, ...state];
        default:
            return state;
    }
}