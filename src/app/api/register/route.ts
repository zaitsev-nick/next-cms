import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log(email)
    return NextResponse.json({
      message: 'User registered',
    }, {
      status: 201,
    })
  } catch(error) {
    return NextResponse.json({
      message: 'Error',
    }, {
      status: 500,
    })
  }
  
}