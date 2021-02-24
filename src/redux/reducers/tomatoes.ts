import {ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO,EDIT_TOMATO} from '../actionTypes';
// eslint-disable-next-line
export default (state: any[] = [], action: any) => {
    switch (action.type) {
        case ADD_TOMATO:
            return [action.payload, ...state];
        case INIT_TOMATOES:
            return [...action.payload];
        case UPDATE_TOMATO:
            return state.map(t => {
                if (t.id === action.payload.id) {
                    return action.payload;
                } else {
                    return t;
                }
            });
        case EDIT_TOMATO:
            return state.map(t=>{
                if(t.id === action.payload){
                    return Object.assign({},t,{editing: true})
                }else{
                    return Object.assign({},t,{editing: false})
                }
            })
        default:
            return state;
    }
}