export const getData = () => ({
    type: 'home/getData',
    payload: 'test'
})

export const getTestData = (...args) => ({
    type: 'home/testRequest',
    args
})