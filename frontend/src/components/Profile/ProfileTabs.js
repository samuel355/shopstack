import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUserProfile } from '../../Redux/Actions/UserActions'
import Error from '../LoadingError/Error'
import Loading from '../LoadingError/Loading'
import Toast from '../LoadingError/Toast'
import { listMyOrders } from '../../Redux/Actions/OrderActions';

const ProfileTabs = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    const toastId = useRef(null)

    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails)
    const {loading, error, userInfo} = userDetails

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const {loading: updateLoading, error: updateError, userUpdateInfo} = userUpdateProfile

    const ToastObjects = {
        pauseOnFocusLoss : false,
        draggable : false,
        pauseOnHover: false,
        autoClose: 2000
    }

    useEffect(() => {
      if(userInfo){
        setName(userInfo.name)
        setEmail(userInfo.email)
      }
    }, [dispatch, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== cpassword){
            // if(!toast.isActive(toastId.current)){
            //     toastId.current = toast.error("Passwords do not match", ToastObjects)
            // }
            toastId.current = toast.error("Passwords do not match", ToastObjects)
        }else{
            dispatch(updateUserProfile({id: userInfo._id, name, email, password}))
            toastId.current = toast.success("Your Details is updated Successfully", ToastObjects)
        }
    }
    
    return (
        <>
            <Toast />
            <div className="container">
                <form onSubmit={submitHandler}>
                    {
                        error && <Error variant={'alert-danger'}> {error} </Error>
                    }
                    {
                        loading && <Loading />
                    }
                    <div className="row">
                        <div className="col-md-6 bg-light p-3">
                            <label htmlFor="full-name" className="label"> FULL NAME</label> <br />
                            <input className='form-control mt-2' name='full-name' type="text" value={name} onChange={(e) => setName(e.target.value)}  />
                        </div>
                        <div className="col-md-6 bg-light p-3">
                            <label htmlFor="email" className="label"> EMAIL</label> <br />
                            <input className='form-control mt-2' type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)}  />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 bg-light p-3">
                            <label htmlFor="password" className="label"> PASSWORD</label> <br />
                            <input className='form-control mt-2' name='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                        </div>
                        <div className="col-md-6 bg-light p-3">
                        <label htmlFor="c-password" className="label">CONFIRM PASSWORD</label> <br />
                            <input name='c-password' className='form-control mt-2' type="password" value={cpassword} onChange={(e) => setCPassword(e.target.value)}  />
                        </div>
                    </div>
                    <div className="row bg-light mb-3">
                        <div className="col-md-12 text-center">
                            <button className='btn btn-success mb-3'>UPDATE PROFILE</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProfileTabs