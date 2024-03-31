/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState, useRef } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBBadge,
} from 'mdb-react-ui-kit';
import { useGetMessagesQuery, useSendMessageMutation, useSendNotificationMutation } from '../../services/chat';
import Chat from './Chat';
import { useSocketContext } from '../../../context/SocketContext';
import notificationSound from '../../assets/sounds/notification.mp3'
export default function ChatComponent({ senderData }) {
  const [inputMessage, setInputMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [userName, setUserName] = useState('');
  const [receiverImage, setReceiverImage] = useState('');
  const [userChat, setUserChat] = useState([]);
  const { data: userChatData, isLoading: isChatLoading, error: chatError, refetch } = useGetMessagesQuery(receiverId);
  const [sendMessage, { isLoading: isSendMessageLoading, error: sendMessageError }] = useSendMessageMutation();
  const [sendNotification,{ isLoading: isSendNotificationLoading, error: sendNotificationError }]=useSendNotificationMutation()
  const messagesEndRef = useRef(null);
  const { onlineUsers, socket } = useSocketContext();
  const isOnline = onlineUsers.includes(receiverId);
  const isMounted = useRef(false);



  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (userChatData) {
      setUserChat(userChatData);
      scrollToBottom();

    }
  }, [userChatData]);


  useEffect(() => {
    scrollToBottom();
    refetch()

  }, [userChat]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData.role === 'Designer') {
      setReceiverId(senderData?.project?.createdBy?._id);
      setReceiverImage(senderData?.project?.createdBy?.image);
      setUserName(senderData?.project?.createdBy?.userName);
    } else {
      setReceiverId(senderData?.createdBy?._id);
      setReceiverImage(senderData?.createdBy?.image);
      setUserName(senderData?.createdBy?.userName);
    }
  }, [senderData]);

  useEffect(() => {
    scrollToBottom();

    const handleNewMessage = (newMessage) => {

      if (isMounted.current) {
        setUserChat(prevUserChat => [...prevUserChat, newMessage]);
        refetch()
        const sound = new Audio(notificationSound);
        sound.play();
      }
    };

    if (socket) {
    console.log(socket)

      socket.on('newMessage', handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off('newMessage', handleNewMessage);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const handleSendMessage = async () => {
    try {
      console.log({ receiverId, message: inputMessage });
      await sendMessage({ receiverId, message: inputMessage });
      await sendNotification({receiverId,notification: inputMessage})

     

      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (isChatLoading) {
    return <div className='vh-25 d-flex justify-content-center  align-items-center '>Loading...</div>;
  }

  if (chatError) {
    return <div>Error: {chatError.message}</div>;
  }

  return (
    <MDBContainer fluid className="">
      <MDBRow className="">
        <MDBCol className="d-flex justify-content-center ">
          <MDBCard id="chat2" style={{ borderRadius: '15px', width: '100%' }}>
            <MDBCardHeader className="d-flex  align-items-center ">
              {isOnline ? (<div className=' position-relative'>
                <MDBBadge className='position-absolute top-0 start-100 translate-middle p-1 w-25 bg-success  rounded-circle'>
                  <span className='visually-hidden'>New alerts</span>
                </MDBBadge>
                <img
                  src={`http://localhost:3000/${receiverImage}`}
                  alt="avatar 3"
                  style={{ width: "40px", height: "40px", border: "3px solid #198754", borderRadius: "100%" }}
                />
              </div>) : (<div className=' position-relative'>
                <MDBBadge className='position-absolute top-0 start-100 translate-middle p-1 w-25 bg-danger  rounded-circle'>
                  <span className='visually-hidden'>New alerts</span>
                </MDBBadge>
                <img
                  src={`http://localhost:3000/${receiverImage}`}
                  alt="avatar 3"
                  style={{ width: "40px", height: "40px", border: "2px solid #dc3545", borderRadius: "100%" }}
                />
              </div>)}


              <h6 className="ms-2 mb-0">{userName}</h6>
            </MDBCardHeader>

            <MDBCardBody className="overflow-y-scroll">
              {userChat.length > 0 ? (
                userChat.map((item) => (
                  <div key={item._id}>
                    <Chat data={item} />
                  </div>
                ))
              ) : (
                <p className="p-3">NO MESSAGES FOUND</p>
              )}
              <div ref={messagesEndRef} />
            </MDBCardBody>

            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">

              <input
                type="text"
                className="form-control form-control-md"
                placeholder="Type message"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button className="btn p-1 ms-2 text-white px-2 bg-secondary">
                <i className="fa-solid fa-paperclip"></i>
              </button>
              <button className="btn p-1 m-2 bg-dark text-white px-2">
                <i className="fa-regular fa-face-smile"></i>
              </button>
              <button onClick={handleSendMessage} className="btn p-1 bg-primary text-white px-2">
                {isSendMessageLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
              </button>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

