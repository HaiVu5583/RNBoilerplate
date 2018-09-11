const initialState = {
  data: []
}
export const query = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'app/saveResult':
      return {...state, data: payload}
    default:
      return state
  }
}