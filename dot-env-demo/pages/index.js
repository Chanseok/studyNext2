import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button } from 'antd'
import styled from 'styled-components'

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;  
  height: 40px;
  font-size: 14px;
  border-radius: 50%;
  border: 1px solid #e5e5e5;
`;

export default function Home() {

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1> Hello Next.js with antd</h1>
        <p>
          API_HOST: {process.env.API_HOST}
        </p>
        <div className="flex">
          <Circle className="mr-4">1</Circle>
          <Circle className="mr-4">2</Circle>
          <Circle className="mr-4">3</Circle>
        </div>
        <button className="btn-blue my-4">Tailwind button</button>
        <div>
          <Button>Welcome</Button>
        </div>
      </div>
    </div>
  )
}
