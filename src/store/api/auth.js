import { get, post } from './common'
export default {
    signIn: (phone, password) => {
        return post('/user/signin', { phone, password })
    },
}