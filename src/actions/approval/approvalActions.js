import * as cont from '../../config/constant'
export function allApprovalDefines(dispatch, params) {
    return function (dispatch) {
        dispatch(getAllApprovalDefinesSuccess([
            { id: 11, name: '审批定义1', processKey: '12121', activitiID: '1212', indx: 1, sheettype: '业务单', bsType: '业务类型1', valid: true }, { id: 11, name: '审批定义1', valid: true, processKey: '12121', activitiID: '1212', indx: 1, sheettype: '业务单', bsType: '业务类型1' }, { id: 11, name: '审批定义1', processKey: '12121', activitiID: '1212', indx: 1, valid: true, sheettype: '业务单', bsType: '业务类型1' }
        ], params.page));
        return fetch(cont.getURL('url1........')).then((response) => response.json())
            .then((data) => {

            }).catch((err) => {
            });
    }
}
function getAllApprovalDefinesSuccess(approvalDefines, page) {
    for (let i = 0; i < approvalDefines.length; i++) {
        approvalDefines[i].key = i;
        approvalDefines[i].validstr = approvalDefines[i].valid ? '有效' : '无效';
    }
    return {
        type: 'get_approvalDefines_success',
        payload: {
            approvalDefines: approvalDefines,
            page: page,
        }
    }
}
function getAllApprovalDefinesFailure() {
    return {
        type: 'get_approvalDefines_failure',
    }
}



export function countApprovalDefines(dispatch) {
    return function (dispatch) {
        dispatch(countApprovalDefinesSuccess(100));
        return fetch(cont.getURL('url1........')).then((response) => response.json())
            .then((data) => {

            }).catch((err) => {
            });
    }
}
function countApprovalDefinesSuccess(total) {
    return {
        type: 'count_approvalDefines_success',
        payload: {
            total: total,
        }
    }
}





export function clearApprovalDefines(dispatch) {
    return {
        type: 'clear_approvalDefines',
    }
}

export function editA(ap) {
    return {
        type: 'edit_approvalDefine_start',
        payload: {
            approvalDefine: ap,
        }
    }
}

export function deleteA(ap, dispatch) {
    return function (dispatch) {
        return fetch(cont.getURL('url1........')).then((response) => response.json())
            .then((data) => {
                if (data.code == 0) {
                    dispatch({
                        type: 'delete_approvalDefine_start',
                        payload: {
                            approvalDefine: ap,
                        }
                    });
                }
            }).catch((err) => {
            });
    }
}



export function initBusiTypes(dispatch) {
    return function (dispatch) {
        dispatch({
            type: 'approval_init_busi_types',
            payload: {
                busiTypes: [{
                    id: 1,
                    name: '业务1'
                }, {
                    id: 2,
                    name: '业务2'
                }, {
                    id: 3,
                    name: '业务3'
                }],
            }
        })
        return fetch(cont.getURL('url1........')).then((response) => response.json())
            .then((data) => {
                if (data.code == 0) {
                    dispatch({
                        type: 'approval_init_busi_types',
                        payload: {
                            busiTypes: data.items,
                        }
                    });
                }
            }).catch((err) => {
            });
    }
}


export function loadApprovalDefine(dispatch, id) {
    return function (dispatch) {
        dispatch({
            type: 'approval_load_Approval_Define_success',
            payload: {
                approvalDefine: {
                    id: 11, name: '审批定义1', processKey: '12121', activitiID: '1212', indx: 1, sheettype: '业务单', bsType: '业务类型1', valid: true
                },
            },
        });
        return fetch(cont.getURL('url1........')).then((response) => response.json())
            .then((data) => {
                if (data.code == 0) {
                    dispatch({
                        type: 'approval_load_Approval_Define_success',
                        payload: {
                            approvalDefine: data.item,
                        }
                    });
                }
            }).catch((err) => {
                console.log(JSON.stringify(err));
            });
    }
}

export function save(dispatch, ap, values,history) {
    return function (dispatch) {
        if (ap != null) {
            values.id = ap.id;
        }
        history.goBack();
        return fetch(cont.getURL('url1........')).then((response) => response.json())
            .then((data) => {
                if (data.code == 0) {
                    history.goBack(-1);
                }
            }).catch((err) => {
                console.log(JSON.stringify(err));
            });
    }
}