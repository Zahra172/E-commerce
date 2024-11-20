import { createContext, useState } from "react";

export let CounterContext = createContext(0)

export default function CounterContextProvider(props) {
    const [counter , setCounter] = useState(0)
    const [userName , setUserName] = useState(" ")

    function changeCounter() {
        let c = counter;
        c +=1;
        setCounter(c)
    }

    return <CounterContext.Provider value={ {counter,userName, setCounter ,changeCounter} }>
        {props.children}

    </CounterContext.Provider>
}