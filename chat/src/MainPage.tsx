import React, {useEffect, useState} from "react";
import Pusher from "pusher-js";

import './App.css'


interface Props {}

interface Message {
    userName: string
    message: string
}

export const MainPage: React.FC<Props> = ({}) => {
    const [userName, setUserName] = useState<string>('UserName')
    const [messages, setMessages] = useState<Array<Message>>([])
    const [message, setMessage] = useState<string>('')
    let allMessages: any = []



    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('', {
            cluster: ''
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', function(data: any) {
            allMessages.push(data)
            setMessages(allMessages)
            alert(JSON.stringify(data));
        });
    })

    const Submit =  async(e: any) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userName,
                message
            })
        });

        setMessage('');
    }

  return (
      <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" >
          <div
             className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
              <input className={"fs-5 fw-semibold"} value={userName} type="text" onChange={e => setUserName(e.currentTarget.value)} />
          </div>
          <div className="list-group list-group-flush border-bottom scrollarea">
              {
                  messages.map(message => (
                      <div className="list-group-item list-group-item-action active py-3 lh-tight" aria-current="true">
                          <div className="d-flex w-100 align-items-center justify-content-between">
                              <strong className="mb-1">
                                  {
                                      message.userName
                                  }
                              </strong>
                          </div>
                          <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and
                              {
                                  message.message
                              }
                          </div>
                      </div>
                  ))
              }
          </div>
          <form action="" onSubmit={e => Submit(e)}>
              <input onChange={e => setMessage(e.currentTarget.value)} type="text" className={"form-control"} placeholder={"Write A Message"}/>
          </form>
      </div>
      </div>
  );
};
