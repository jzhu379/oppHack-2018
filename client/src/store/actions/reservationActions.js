import actionTypes from './types/index';
import axios from 'axios';
export const makeReservation=(parkId, dayId, timeblockId, callbackFunc)=>dispatch=>{
  dispatch({
    type: actionTypes.loading.MAKE_RESERVATION_LOADING
  });
  dispatch({
    type: actionTypes.errors.REMOVE_MAKE_RESERVATION
  })
  axios.post(`/api/reservation/${parkId}/${dayId}/${timeblockId}`)
    .then(response=>{
      axios.get(`/api/park/${parkId}`)
        .then(response=>{
          dispatch({
            type: actionTypes.parks.SET_SINGLE_PARK,
            payload: response.data.park
          });
          callbackFunc();
          dispatch({
            type: actionTypes.loading.STOP_MAKE_RESERVATION_LOADING
          })
          axios.get('/api/users/current')
            .then(user=>{
              dispatch({
                type: actionTypes.auth.SET_USER,
                payload: user
              });
              
            })
        })
    })
    .catch(err=>{
      dispatch({
        type: actionTypes.errors.MAKE_RESERVATION
      })
      dispatch({
        type: actionTypes.loading.STOP_MAKE_RESERVATION_LOADING
      })
    })
}
export const cancelOwnReservation=(reservationId)=>dispatch=>{
  console.log(reservationId);
  axios.put(`/api/reservation/cancel/${reservationId}`)
    .then(response=>{
      axios.get('/api/users/current')
        .then(response=>{
          dispatch({
            type: actionTypes.auth.SET_USER,
            payload: response.data.user
          })
        })
        .catch(error=>{
          console.log(error.response);
        })
    })
}