

import { createStore } from 'redux'
import axios from 'axios'

const reducer = function (state = [], action) {
    // if (action.type.code == 1) {
    //     let arr = action.type.imgurl
    //     state = arr
    //     return state;
    // }
    if (state == []) {
        axios.post('http://localhost:7070/uploadImg/readImgUrl').then((res) => {
            // store.dispatch({ type: res.data.data })
            // resolve(res.data.data)
        })
    }
    return state;

}
const store = createStore(reducer);


export default store;
