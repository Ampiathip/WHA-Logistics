export const actionTypes = {
    FAILURE: 'FAILURE',
    LOG_IN: 'LOG_IN',
    LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
    CHECK_LOGIN: 'CHECK_LOGIN',
    AUTHEN_LOGIN: 'AUTHEN_LOGIN',
    LOG_OUT: 'LOG_OUT',
    LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
    SIDE_BAR: 'SIDE_BAR',
    THEME: 'THEME',
    ZONE: 'ZONE,'
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

export function addZone(payload) {
    console.log("actions_addZone", payload);
    return { type: actionTypes.ZONE, payload }
};

export function logout(payload) {
    return { type: actionTypes.LOG_OUT, payload }
};

export function checkLogin() {
    return { type: actionTypes.CHECK_LOGIN}
};

export function checkAuthen() {
    return { type: actionTypes.AUTHEN_LOGIN}
};

