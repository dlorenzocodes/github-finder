import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {

    const initialState = {
        users: [],
        user: {},
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    function setLoading() {
        dispatch({type: 'SET_LOADING'})
    }

    const clearSearch = () => {
        dispatch({
            type: 'CLEAR_USERS',
            payload: []
        })
    }

    const searchUsers = async (text) => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const {items} = await response.json()
        
        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }


    const getSingleUser = async (login) => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if(response.status === 404){
            window.location = '/notfound'
        } else{
            const data = await response.json()
            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }

    }

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUsers,
        clearSearch,
        getSingleUser
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext