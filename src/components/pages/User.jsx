import {useContext, useEffect} from 'react'
import GithubContext from '../../context/github/GithubContext'
import {useParams} from 'react-router-dom'


function User() {

    const {getSingleUser, user} = useContext(GithubContext)

    const params = useParams()

    useEffect(() => {
        getSingleUser(params.login)
    },[])

    return (
        <div>
            {user.login}
        </div>
    )
}

export default User
