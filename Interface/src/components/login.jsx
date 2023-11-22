import '../login.css'
import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../hooks/authentication'
import { useEffect } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useAuth } from '../context/authContext'
import { loginRequest } from '../api/auth'
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons'

export function Login() {
  const { token, isAuth } = useAuth()

  const { Auth, updateAuth } = useAuthentication()

  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await loginRequest({ token })
        if (res.status === 200) {
          updateAuth(true)
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (isAuth && token) getUser()
  }, [token])

  useEffect(() => {
    if (Auth === true) {
      navigate('/')
    }
  }, [Auth])

  const loginWithGoogle = () => {
    const auth = getAuth()
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((userCreation) => {
        if (userCreation.user) {
          updateAuth(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="form-login">
        <h3>TaskGlide Login</h3>

        <label htmlFor="username" className="username">
          Username
        </label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          className="input-username"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="input-username"
        />

        <button className="button-login">Log In</button>
        <div className="social">
          <div onClick={loginWithGoogle} className="go">
            <GoogleOutlined />
          </div>
          <div className="fb">
            <FacebookOutlined />
          </div>
        </div>
      </form>
    </>
  )
}
