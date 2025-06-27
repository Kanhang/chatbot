
import { MODEL } from '../constants/bots';
import OpenAI from "openai";
import { cache } from 'react';
import { BASEURL } from '../constants/bots';

export async function startChat(host, messages) {
    const getScrets =  cache(getAuthCode);
    const secret = await getScrets(host);
    const client = new OpenAI({
        baseURL: BASEURL,
        apiKey: secret,
        dangerouslyAllowBrowser: true
        });
  if (!client) { return ;}
  const completion = await client.chat.completions.create({
              messages: messages,
              model: MODEL
            });
    
        return [...messages, completion.choices[0].message];
    
    }
    

async function getAuthCode(host) {

    const resp = await fetch(`http://${host}/api`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const data = await resp.json();
    const secret = data?.message[0].token;
    return secret;
    
}