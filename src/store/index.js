import { atom } from 'recoil'

export const listStore = atom({
    key: 'listStore',
    default:[]
})

export const avatarState = atom({
    key: 'avatarState',
    default: 0
})