import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <div>
      env: {process.env.API_HOST}
    </div>
  )
}
