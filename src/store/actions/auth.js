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