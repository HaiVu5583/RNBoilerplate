export const getData = () => ({
    type: 'home/getData',
    payload: 'test'
})

export const getTestData = (...args) => ({
    type: 'home/testRequest',
    args
})

export const actionTest1 = (data) => ({
    type: 'home/testFunc1',
    payload: data
})

export const actionTest2 = (data) => ({
    type: 'home/testFunc2',
    payload: data
})