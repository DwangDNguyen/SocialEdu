import * as React from "react"
import io from "socket.io-client"
import { Socket } from "socket.io-client"
 const SocketContext = React.createContext({})
 export const useSocket = () => {
    return React.useContext(SocketContext).socket
 }

 const SocketProvider = ({ children }) => {
     const [socket, setSocket] = React.useState()
 }