const initialState = {

}
export const auth = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'auth/saveUserDataa': {
            return payload
        }
        default:
            return state
    }
}
