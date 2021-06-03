import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    LOADING_USER,
    USER_LOADED
} from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyB0qXYACrjc3V4yF3syi8LRTZjcS3kVxig'

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT,
    }
}

export const createUser = user => {
    return dispatch => {
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro ao criar esse usuário!'
                }))
            })
            .then(res => {
                if (res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name
                    })
                        .catch(err => {
                            dispatch(setMessage({
                                title: 'Erro',
                                text: 'Não foi possivel salvar os dados desse usuário!'
                            }))
                        })
                        .then(() => {
                            delete user.password,
                                user.id = res.data.localId
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                        })
                }
            })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const login = user => {
    return dispatch => {
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro ao logar!'
                }))
            })
            .then(res => {
                if (res.data.localId) {
                    axios.get(`/users/${res.data.localId}.json`)
                        .catch(err => {
                            dispatch(setMessage({
                                title: 'Erro',
                                text: 'Email ou senha inválidos!'
                            }))
                        })
                        .then(res => {
                            delete user.password,
                                user.name = res.data.name
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                        })
                }
            })
    }
}