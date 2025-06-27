'use server'
import { headers } from 'next/headers'
import { neon } from '@neondatabase/serverless';
import OpenAI from "openai";
import createAction from './action';
import Client from './client';
import { BASEURL } from '../constants/bots'
import { cache } from 'react'


export default async function Chatbot () {

  const header = await headers();
  const host = header.get('host');
  // const getScrets = cache(initialize);
  //   const secret = await getScrets();
  //   async function initialize()  {
  //      const resp = await fetch(`http://${host}/api`, {
  //        method: 'GET',
  //        headers: {
  //          'Content-Type': 'application/json'
  //        }
  //      })
  //      const data = await resp.json();
  //      return data?.message
  //    }

     
     return (<Client host= {host} />)
}
