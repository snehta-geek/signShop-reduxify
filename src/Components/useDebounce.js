import React, { useEffect, useState } from 'react'

const Debounce = () => {
    const [inputVal,setInputVal]=useState('')


    function useDebounceHook(inpVal,delay){
        const [isDebounced,setIsDebounced]=useState(inpVal)

        useEffect(()=>{
            let timer = setTimeout(() => {
                setIsDebounced(inpVal)
                
            }, delay);
            return()=> clearTimeout(timer)
        },[inpVal,delay])

        console.log("debounceVal---",isDebounced);

        
return isDebounced
    }
    const debounceVal = useDebounceHook(inputVal,2000)
  return (
    <div>Debounce
        <input type="text" onChange={e => setInputVal(e.target.value)}/>
        <span>Debounce value: {debounceVal} </span>
    </div>
  )
}

export default Debounce