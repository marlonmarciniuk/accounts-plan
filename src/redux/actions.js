export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

export const addAccount = account => dispatch => {
    dispatch({
        type: ADD_ACCOUNT,
        payload: account
    })
}

export const removeAccount = account => dispatch => {
    dispatch({
        type: REMOVE_ACCOUNT,
        payload: account
    })
}
