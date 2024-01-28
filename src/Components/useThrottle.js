import React, { useRef, useState,useEffect } from 'react'

const UseThrottleComp = () => {


    function useThrottle(cb, delay) {
        const [isThrottled, setisThrottled] = useState(false)
        let saveCallback = useRef()

        useEffect(() => {
            saveCallback.current = cb
        }, [cb])


        useEffect(() => {
            if (isThrottled) return;

            const throttledFunc = function () {
                if (!isThrottled) {
                    saveCallback.current();
                    setisThrottled(true)
                    setTimeout(() => {
                        setisThrottled(false)
                    }, delay);
                }
            }
            window.addEventListener('resize', throttledFunc)
            return () => window.removeEventListener('resize', throttledFunc)


        }, [isThrottled, delay])

        return isThrottled

    }
    function handleResize() {
        console.log("resizing.....");
    }
    const throttled = useThrottle(handleResize, 5000)
    return (
        <div>
            <h1>Throttle Exp</h1>
            <p>is throttle : {throttled ? 'Yes' : 'No'}</p>
        </div>
    )
}

export default UseThrottleComp