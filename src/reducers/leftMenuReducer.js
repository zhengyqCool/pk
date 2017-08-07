import Immutable from 'immutable';

let initState = {
    menus: [],
}
export function lmenuReducer(state = initState, action) {
    let fromjs = Immutable.fromJS(state);
    switch (action.type) {
        case 'get_left_menu':
            let ms = action.payload.menus;
            fromjs= fromjs.set('menus', Immutable.fromJS(ms));
            return fromjs.toJS();
    }
    return state;
}