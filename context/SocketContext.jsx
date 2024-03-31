

import {createContext ,useEffect,useState,useContext} from 'react'
import io  from 'socket.io-client'

const SocketContext = createContext()
export const useSocketContext =()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
    const [socket, setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
  const isUserLoggedIn =JSON.parse(localStorage.getItem('userData'));
  console.log(isUserLoggedIn)
    useEffect(() => {
        if (isUserLoggedIn) {
        console.log("Connecting...")
        const socket = io('http://localhost:3000',{
            query:{
                userId : isUserLoggedIn?.userId
            }
        });
        setSocket(socket);
        socket.on("getOnlineUsers",(users)=>{
            setOnlineUsers (users)
        })
        return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
        
    }, []);
    return <SocketContext.Provider value={{socket,onlineUsers}} >{children}</SocketContext.Provider>
}