const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let incrementGood = { ...state, good: state.good + 1 }
      return incrementGood
    case 'OK':
      let incrementOk = { ...state, ok: state.ok + 1 }
      return incrementOk
    case 'BAD':
      let incrementBad = { ...state, bad: state.bad + 1 }
      return incrementBad
    case 'ZERO':
      let stateZero = { good: 0, ok: 0, bad: 0 }
      return stateZero
    default: return state
  }

}

export default counterReducer