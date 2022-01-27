import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {

    const initialState = {
        users: [],
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

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearSearch
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext