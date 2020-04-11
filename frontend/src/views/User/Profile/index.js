import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserProfile} from '../../../redux/actions'

const Profile = () => {
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)

  useEffect(() => {
    async function getUser() {
      const user = await dispatch(getUserProfile())
      return user
    }
    getUser()
  }, [dispatch])

  console.log(userState)
  return <div>User profile</div>
}

export default Profile
