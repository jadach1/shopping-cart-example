import { useReducer } from "react"
import MessagingContext from "./MessagingContext"

const initialMessage = {
    message: { title: '',message: '',icon: '',colour: ''},
    show: false
}

const MessagingReducer = (state, action) => {

    switch (action.type) {
        case "SUCCESS":
            return {
                ...state,
                message: action.payload,
                show: true
            }
        default:
            return initialMessage
    }
}

const MessagingContextProvider = (props) => {

    const [messageStore, dispatchMsg] = useReducer(MessagingReducer, initialMessage)

    const newMessage = (info) => {
        console.log("new message")
        console.log(info)
        dispatchMsg({type: "SUCCESS", payload: info.payload})
    }

   const MessageContext = {
        message: messageStore,
        show: messageStore.show,
        newMessage: newMessage
    }

    return (
        <MessagingContext.Provider value={MessageContext}>
            {props.children}
        </MessagingContext.Provider>
    )
}

export default MessagingContextProvider;