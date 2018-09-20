export const signIn = (...args) => ({
    type: 'auth/signIn',
    args
})

export const saveUserData = (data) => ({
    type: 'auth/saveUserData',
    payload: data
})

export const signUp = (...args) => ({
    type: 'auth/signUp',
    args
})

export const createOTPToken = (...args) => ({
    type: 'auth/createOTPToken',
    args
})

export const verifyOTPToken = (...args) => ({
    type: 'auth/verifyOTPToken',
    args
})

export const checkExistUser = (...args) => ({
    type: 'auth/checkExistUser',
    args
})

export const changePassword = (...args) => ({
    type: 'auth/changePassword',
    args
})

export const updateAccessToken = (data) => ({
    type: 'auth/updateAccessToken',
    payload: data
})