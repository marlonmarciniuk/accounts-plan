import { GET_ACCOUNTS, ADD_ACCOUNT, REMOVE_ACCOUNT } from './actions';

const initialState = {
    accounts: [],
};

function accountsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ACCOUNT:
            return { ...state, accounts: [...state.accounts, action.payload] };
        case REMOVE_ACCOUNT:
            return {
                ...state,
                accounts: state.accounts.filter(account => account.code !== action.payload.code)
            };
        default:
            return state;
    }
}

export default accountsReducer;