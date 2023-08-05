import axios from 'axios';
import setAuthToken from 'src/api/setAuthToken';
import { useNavigate } from "react-router-dom";

const API_BASE: string = 'http://localhost:5000/user';
const API_VERIFY: string = 'http://localhost:5000/verify';

// export const loadUser = (token) => (dispatch) => {
//   axios
//     .get(`${API_BASE}/get-user`)
//     .then(res => {
      
//       dispatch({
//         type: 'USER_LOADED',
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: 'GET_ERROR',
//         payload: err.response.data
//       });
//     }
//     )
// };

export const signUp = (data: {}) => (dispatch) => {
  dispatch({
    type: 'SET_SIGNUP_INFO',
    payload: data
  })
  // axios
  //   .post(`${API_BASE}/sign-up`, data)
  //   .then(res => {
  //     alert("Successfully sign up...")
  //     window.location.href = '/user/sign-in';
  //     // navigate('/user/sign-in')
  //   })
  //   .catch(err => {
  //     console.log(err.response.data)
  //   })

  axios
    .post(`${API_VERIFY}/email-verify`, data)
    .then(res => {
      alert("Successfully verify...")
    })
    .catch(err => {
      console.log(err.response.data)
    })
}

export const resendVerificationCode = (data: string) => {
  axios
    .post(`${API_VERIFY}/token`, data)
    .then(res => {
      alert("Successfully verify...")
    })
    .catch(err => {
      console.log(err.response.data)
    })
}

export const checkToken = (data: string) => {
  axios
    .post(`${API_VERIFY}/check-token`, data)
    .then(res => {
      alert("Successfully verify...")
    })
    .catch(err => {
      console.log(err.response.data)
    })
}

export const editProfile = (id: string, token: string, data: any) => (dispatch) => {
  axios
    .put(`${API_BASE}/edit-profile/${id}`, data)
    .then(res => {
      const payload = {
        token: token,
        user: res.data.profile
      }
      dispatch({
        type: 'LOGIN_SUCCESS', payload: payload
      })
      alert(res.data.message)
    })
    .catch(err => {
      console.log(err.response.data)
    })
}

export const signIn = (data: {}) => (dispatch) => {
  axios
    .post(`${API_BASE}/sign-in`, data)
    .then(res => {
      alert("Successfully sign in...")
      setAuthToken(res.data.data.token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.data });
      window.location.href = '/';
      // navigate('/user/profile')
    })
    .catch(err => {
      console.log(err.response.data);
      // Dispatch an action if needed
      dispatch({ type: 'GET_ERROR', payload: err.response.data });
    });
};

export const signOut = () => dispatch => {
  localStorage.removeItem('token')
  dispatch({
    type: 'LOGOUT',
    payload: null
  })
}

export const changePassword = (data: any) => {
  const id: string = data.id;
  console.log(id)
  axios
    .put(`${API_BASE}/change-password/${id}`, data)
    .then(res => {
      alert(res.data)
    })
    .catch(err => {
      alert(err.response.data.error)
    })
}