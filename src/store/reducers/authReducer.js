import constants from '../constants/authConstants';

const initialState = {
    currentAccountIndex: null,
    accountList: []
};

export default (state, action) => {
    if (!state) {
        return initialState;
    }

    switch (action.type) {
        case constants.AUTH_LOGIN:
            return {
                ...state,
                currentAccountIndex: state.accountList.length,
                accountList: [...state.accountList, action.data]
            };
        case constants.AUTH_CHANGE_ACCOUNT:
            return {
                ...state,
                currentAccountIndex: action.data
            };
        case constants.AUTH_LOGOUT:
            return {
                currentAccountIndex: state.accountList.length > 1 ? 0 : null,
                accountList: state.accountList.filter(
                    (item, index) => index !== state.currentAccountIndex
                )
            };
        default:
            return state;
    }
};
