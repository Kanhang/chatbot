
import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless';

export async function GET (request) {
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql('SELECT * FROM auth');
    return  NextResponse.json({ message:  data});

}
