import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import ProfileTabs from '../components/Profile/ProfileTabs'
import Orders from '../components/Profile/Orders'
import { getUserDetails } from '../Redux/Actions/UserActions'
import moment from 'moment'
import { listMyOrders } from '../Redux/Actions/OrderActions'
import {useNavigate } from 'react-router-dom'

const ProfileScreen = () => {
    const navigate = useNavigate()
    const [ordersTab, setOrdersTab] = useState(true)
    const [profileTab, setProfileTab] = useState(false)

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const handleProfileTab = () => {
        setProfileTab(true)
        setOrdersTab(false)
    }
    const handleOrdersTab = () => {
        setProfileTab(false)
        setOrdersTab(true)
    }

    const myOrdersList = useSelector((state) => state.myOrdersList)
    const {loading, error, orders} = myOrdersList

    useEffect(() => {
      if(userInfo === null){
        navigate('/login')
      }
    }, [userInfo, navigate])
    

    useEffect(() => {
        dispatch(listMyOrders())
    }, [dispatch])

    useEffect(() => {
      dispatch(getUserDetails(''))
    }, [dispatch])
    
  return (
    <>
        <Header />
        <div className="container mt-lg-5 mt-3">
            <div className="row align-items-start">
                <div className="col-lg-4 p-0 shadow">
                    <div className="author-card-cover"></div>
                    <div className="author-card-profile row">
                        <div className="author-card-avatar col-md-5">
                            <img src="/images/team/01.jpg" alt="User Profile-Imag" />
                        </div>
                        <div className="col-md-7 author-card-details mt-3">
                            <h5 className="author-card-name mb-2 mt-3" style={{textAlign: 'right'}}>
                                <strong>{userInfo?.name}</strong>
                            </h5>
                            <p className="author-card-position"  style={{textAlign: 'right'}}>
                                {/* actual date Joined {moment(userInfo.createdAt).format('LL')} */}
                                Joined: {moment(userInfo?.createdAt, "YYYYMMDD").fromNow()}
                            </p>
                        </div>
                    </div>
                    <div className="wizard pt-3">
                        <button style={{width: '80%', marginBottom: '10px', border: 'none', margin: '10px'}} onClick={() => handleOrdersTab()} className={`nav-link ${ordersTab ? 'active' : ''}`} >Orders List <span style={{color: 'red', fontWeight: 'bold'}}>{orders ? orders.length : 0}</span> </button>
                        <button style={{width: '80%', marginBottom: '10px', border: 'none', margin: '10px'}}  onClick={() => handleProfileTab()} className={`nav-link ${profileTab ? 'active' : ''}`}>Profile</button>
                    </div>
                </div>

                <div className=' col-lg-8 pb-5 pt-lg-0 pt-3'>
                    {
                        ordersTab && (
                           <Orders orders = {orders} loading={loading} error={error} />
                        )
                    }
                    {
                        profileTab && (
                            <ProfileTabs />
                        )
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfileScreen