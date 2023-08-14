import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ChatBox from '@/components/textBox'
import Border from '@/components/border'
import IronManArcReactor from '@/components/ArcReactor'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>PECGPT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className} relative`} style={{ overflow: 'hidden' }}>
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: 'url("/2c.png")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            animation: 'zoomAnimation 5s infinite alternate',
            zIndex: -1
          }}
        />
        <ChatBox />
        <p className="text-center text-white absolute bottom-0 left-1/2 -translate-x-[50%]">
                    Made with ❤️ by PECACM
                </p>
      </main>
    </>
  )
}
