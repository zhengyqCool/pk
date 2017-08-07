import Immutable from 'immutable';
let initialState={
    breads:['Home']
};
export function breadReducer(state=initialState,action){
    let fromjs = Immutable.fromJS(state);
    switch(action.type){
        case 'set_bread_success':
            let breads=action.payload.breads;
            fromjs=fromjs.set('breads',Immutable.fromJS(breads));
            return fromjs.toJS();
    }
    return state;
}
