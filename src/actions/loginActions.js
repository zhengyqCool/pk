import * as cont from '../config/constant'

export function getLogin(dispatch) {
    return function (dispatch) {
        dispatch({
            type: 'get_login',
            payload: {
                login: {
                    username: 'mengly', workerName: 'workername', userid: '111', departname: '信息中心', depart: 11, sysDepartID: 112, sysDepartName: '河南明泰'
                }
            }
        });
        return fetch(cont.getURL('url1........')).then((response) => response.json())
            .then((data) => {

            }).catch((err) => {
            });
    }
}