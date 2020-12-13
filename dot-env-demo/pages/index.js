import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button } from 'antd'

export default function Home() {

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1> Hello Next.js with antd</h1>
        <p>
          API_HOST: {process.env.API_HOST}
        </p>
      <div>
        <Button>Welcome</Button>
      </div>
      </div>
    </div>
  )
}
