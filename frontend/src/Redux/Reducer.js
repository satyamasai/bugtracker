import React from 'react'
const initState={
   allBugs:[],
   isLoading:false,
   isError:false,
   criticalBugs:[],
   majorBugs:[],
   mediumBugs:[],
   lowBugs:[]

}
const Reducer = (state=initState, action) => {
  const {type,payload} = action
  // console.log(payload,"pld")
 switch(type){
case "getAllBugs" :
 return  {
 ...state,
    allBugs:payload

  }
  case "addBugs":
    return {
      
      
    }

  default: return state
 }
}

export default Reducer