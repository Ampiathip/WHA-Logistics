export const actionTypes = {
    FAILURE: 'FAILURE',
    LOG_IN: 'LOG_IN',
    LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
    SIDE_BAR: 'SIDE_BAR',
    THEME: 'THEME',
}

export function failure(error) {
    return {
        type: actionTypes.FAILURE,
        error,
    }
}

export function addLogin(payload) {
    console.log("actions", payload);
    return { type: actionTypes.LOG_IN, payload }
};

export function addSidebar(payload) {
    console.log("actions_addSidebar", payload);
    return { type: actionTypes.SIDE_BAR, payload }
};

export function addTheme(payload) {
    console.log("actions_addTheme", payload);
    return { type: actionTypes.THEME, payload }
};
