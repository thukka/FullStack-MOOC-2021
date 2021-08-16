const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.param
        default: return state
    }
}

// action handlers

export const setFilter = (param) => {
    return ({
        type: 'SET_FILTER',
        param
    })
}

export default filterReducer