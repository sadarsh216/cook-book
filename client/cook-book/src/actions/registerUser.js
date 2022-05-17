import axios from "axios";
import { userConstants } from "../constants";
const BASE_URL = "http://localhost:8080";

export const register = (payload) => {
    return dispatch => {
        axios.post(`${BASE_URL}/auth/register`,payload).then(result =>{
            if(result.status === 201){
                dispatch({
                    type:userConstants.REGISTER_SUCCESS,
                    payload:result
                })
            }
        }).catch(error =>{
            dispatch({
                type:userConstants.REGISTER_FAILURE,
                payload:error.response.data
            })
        })
    }
}