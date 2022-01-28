import {useContext} from 'react'
import AlertContext from '../../context/alert/AlertContext'
import {RiErrorWarningFill} from 'react-icons/ri'


function AlertMessage() {

    const {alert} = useContext(AlertContext)

    return alert !== null && (
        <p className='flex items-center mv-4 space-x-2 pb-2'>
            {alert.type === 'error' && (
               <RiErrorWarningFill fill='#FECDD3'/>
            )}
            <strong>{alert.msg}</strong>
        </p>
    )
}

export default AlertMessage
