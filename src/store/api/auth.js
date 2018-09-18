import { get, post } from './common'
export default {
    signIn: (phone, password) => {
        return post('/user/signin', { phone, password })
    },
    signUp: (phone, password, name) => {
        return post('/user/signup', { phone, password, name })
    },
}