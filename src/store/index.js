import reducer from './reducer'
import { createStore } from 'redux'
import { atom } from 'recoil'

const store = createStore(reducer)
export default store

export const listStore = atom({
    key: 'listStore',
    default:[]
})