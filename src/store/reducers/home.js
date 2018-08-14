const initialState = {
    
}
export const home = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'home/getData': {
            console.log('Paylod Home Get Data', payload)
            return state
        }
        default:
            return state
    }
}
