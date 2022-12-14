import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { createClient } from 'contentful'
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import {CardHolder} from '../components/Cards/Card'
import {CaptionCarousel} from "../components/Carousel/CarouselHome"
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ? process.env.CONTENTFUL_SPACE_ID : "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY ? process.env.CONTENTFUL_ACCESS_KEY : "",
  })

  const res = await client.getEntries({ content_type: "showcase" })
  console.log(res.items)

  return {
    props: {
      films: res.items ? res.items : [{fields: {title: "none"}}],
    }
  }
}

export const Carousel = ({ films }:InferGetStaticPropsType<typeof getStaticProps> ) => {
  console.log(films)

  return <>
  <CaptionCarousel films={films}/>
  <CardHolder films={films}/>
</>}
export default Carousel
