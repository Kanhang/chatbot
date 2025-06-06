
import React, { useState, useEffect, useRef} from 'react';
import { BASEURL, MODEL, REACT_APP_OPENAI_API_KEY } from'../constants/bots';
import OpenAI from "openai";
import "./chatbot.css";
import loader from '../assets/loading.webp';

const client = new OpenAI({
    baseURL: BASEURL,
    apiKey: REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });


const ChatBot =  () => {
     //callBot();
    const [messages, setMessages] = useState<any[]>([]);
    const [cur, setCur] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollContainerRef = useRef<any>(null);

    useEffect(() => {}, [cur]);

    useEffect(()=> {
      callBot();
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, [messages.length, loading]);
 
    const type = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCur(e.target.value);
      console.log(cur)
    }
    
    const callBot = async () => { 
      if (messages.length % 2 === 0) {
        return;
      }
      setLoading(true);
      const completion = await client.chat.completions.create({
          messages: messages,
          model: MODEL
        });
      setLoading(false);
      setMessages([...messages, completion.choices[0].message]);
  }
  
    const send = (e: React.MouseEvent) => {
        setMessages( [...messages, {role: 'user', content: cur}]);
        setCur('');
    }


    return (<div className='container'>
            <div ref={scrollContainerRef} className='chat'> 
              {messages.map((msg) => {
                console.log(msg); 
                return <div className={msg && msg.role === 'user'? 'userBox': 'botBox'}>{msg.content}</div>
              })}

              <img src={loader} width="100" height="100" style={{display: loading? 'block' : 'none'}}/>
            </div>
            <div  className="inputBox">
              <textarea value={cur} onChange={type} placeholder='Enter your message' ></textarea>
              <button className="sendBut" onClick={send} disabled= {cur.length === 0 || loading}> Send </button>
            </div>
    
        </div>)
};



export default ChatBot;