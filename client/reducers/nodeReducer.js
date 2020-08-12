const initialState = {
  node: null,
  attribute: '',
  value: ''
}

export const SELECT_NODE = 'SELECT_NODE'
export const SELECT_ATTRIBUTE = 'SELECT_ATTRIBUTE'
export const SELECT_VALUE = 'SELECT_VALUE'

export const selectNode = (node) => {
  return {
    type: SELECT_NODE,
    payload: {
      node
    }
  }
}

export const selectAttribute = (attribute) => {
  return {
    type: SELECT_ATTRIBUTE,
    payload: {
      attribute
    }
  }
}

export const selectValue = (value) => {
  return {
    type: SELECT_VALUE,
    payload: {
      value
    }
  }
}


export const nodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_NODE:
      return {
        ...state, node: action.payload.node
      }
      case SELECT_ATTRIBUTE:
        return {
          ...state, attribute: action.payload.attribute
        }
        case SELECT_VALUE:
          return {
            ...state, value: action.payload.value
          }
          default:
            return state;
  }
}