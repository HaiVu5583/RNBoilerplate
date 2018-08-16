import { get, post } from './common'
export default {
    testData: () => {
        return get('/', {}, 'http://google.com')
    },
}