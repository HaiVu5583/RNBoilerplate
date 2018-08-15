import { THEMES } from '~/src/constants'
const initialState = {
    theme: THEMES.light
}
export const ui = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'ui/changeTheme': {
            return {
                ...state,
                theme: payload
            }
        }
        default:
            return state
    }
}
