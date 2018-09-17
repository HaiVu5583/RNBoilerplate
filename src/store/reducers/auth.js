const initialState = {

}
export const auth = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'auth/saveUserData': {
            console.log('Payload Save user Data', payload)
            return payload
        }
        case 'app/logout': {
            return initialState
        }
        default:
            return state
    }
}
