import { Colours, Categories } from '../utils/filtering'
export const initialState = {
  categoryId: 1,
  genderId: 2,
  colourId: 'all',
  pageId: 2,
  filterColor: 'All',
  filterCategory: 'All',
  colours: Colours,
  categories: Categories
}

export default function fetchProductReducer (state, action) {
  switch (action.type) {
    case 'changeGender':
      return { ...state, genderId: action.payload }
    case 'changeCategory':
      return { ...state, categoryId: action.payload }
    case 'changeColour':
      return { ...state, colourId: action.payload }

    case 'changeFilterColor':
      return {
        ...state,
        colours: state.colours.map(
          item =>
            (item.col === action.payload
              ? {
                  ...item,
                  selected: true
                }
              : { ...item, selected: false })
        )
      }

    case 'changeFilterCategory':
      return {
        ...state,
        categories: state.categories.map(item =>
          item.id === action.payload
            ? { ...item, selected: true }
            : { ...item, selected: false }
        )
      }
    case 'RESET':
      return initialState

    default:
      throw new Error('Unknown actions here')
  }
}
