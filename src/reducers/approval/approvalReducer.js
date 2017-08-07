import Immutable from 'immutable';
let initialState = {
    approvalDefines: [],
    approvalDefine: {
        id: 0,
    },
    total: 0,
    current: 0,
    pageSize: 15,
    busiTypes: []
};
export function approvalReducer(state = initialState, action) {
    let fromjs = Immutable.fromJS(state);
    switch (action.type) {
        case 'count_approvalDefines_success':
            fromjs = fromjs.set('total', action.payload.total);
            return fromjs.toJS();
        case 'get_approvalDefines_success':
            let ads = action.payload.approvalDefines;
            fromjs = fromjs.set('approvalDefines', Immutable.fromJS(ads)).set('current', action.payload.page);
            return fromjs.toJS();
        case 'get_approvalDefines_failure':
            fromjs = fromjs.set('approvalDefines', Immutable.fromJS([]));
            return fromjs.toJS();
        case 'clear_approvalDefines':
            fromjs = fromjs.set('approvalDefines', Immutable.fromJS([])).set('total', 0).set('current', 0);
            return fromjs.toJS();
        case 'edit_approvalDefine_start':
            {
                let app = action.payload.approvalDefine;
                if (app == null) {
                    app = {
                        id: 0,
                    }
                }
                fromjs = fromjs.set('approvalDefine', Immutable.fromJS(app));
            }
            return fromjs.toJS();
        case 'approval_init_busi_types':
            fromjs = fromjs.set('busiTypes', Immutable.fromJS(action.payload.busiTypes));
            return fromjs.toJS();
        case 'approval_load_Approval_Define_success':
            console.log('approval_load_Approval_Define_success:::' + JSON.stringify(action.payload.approvalDefine))
            fromjs = fromjs.set('approvalDefine', Immutable.fromJS(action.payload.approvalDefine));
            return fromjs.toJS();
    }
    return state;
}
