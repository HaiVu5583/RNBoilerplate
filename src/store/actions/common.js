// do nothing
export const noop = () => ({
    type: 'app/noop',
})

// do callback and get result as paload
export const invokeCallback = (callback, ...args) => ({
    type: 'app/invokeCallback',
    payload: callback && callback.call(null, ...args),
})


export const openDrawer = () => ({ type: 'app/openDrawer' })
export const closeDrawer = () => ({ type: 'app/closeDrawer' })

export const logout = () => ({type: 'app/logout'})