import axios from "axios";
import { useDispatch } from "react-redux";
// import { useDispatch } from 'rea';


// ----------------action for getting allbugs from db--------------------
const getAllBugs = (dispatch) => {
    //   const dispatch = useDispatch();
    
    axios
    .get("http://localhost:8080/getBugs")
    .then((res) => {
        console.log(res, "acti");
        dispatch({ type: "getAllBugs", payload: res.data.allBugs });
    })
    .catch((err) => console.log(err));
};

// ----------------action for add bugs to db--------------------

const addBug=(dispatch,bugData)=>{

    axios.post('http://localhost:8080/addbug', bugData)
    .then((res)=>{
        console.log(res)
        dispatch({type:"addBugs",payload:res.data.msg})
         getAllBugs(dispatch)
    })
    .catch((err)=>{
        console.log(err)
    })


}

export { getAllBugs,addBug}
