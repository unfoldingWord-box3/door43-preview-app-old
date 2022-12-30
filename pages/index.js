import Head from 'next/head'
import Link from 'next/link'
import styles from '@styles/Home.module.css'
import { Box } from '@mui/material'

function Home() {
  return (
    <Box
      sx={{
        p: '0 2rem',
        display: 'flex',
        flexGrow: 1,
        boxSizing: 'border-box',
      }}
    >
      <Head>
        <title>Door43 Preview</title>
        <meta name='description' content='Door43 Preview' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Door43 Preview!
        </h1>

        <p className={styles.description}>
          Get started by clicking a resource below
        </p>

        <div className={styles.grid}>
          <Link href='/u/unfoldingWord/en_ult'>
            <a className={styles.card}>
              <h2>ULT &rarr;</h2>
              <p>unfoldingWord/en_ult</p>
            </a>
          </Link>

          <Link href='/u/unfoldingWord/en_ust'>
            <a className={styles.card}>
              <h2>UST &rarr;</h2>
              <p>unfoldingWord/en_ust</p>
            </a>
          </Link>

          <Link href='/u/Door43-Catalog/hi_irv'>
            <a className={styles.card}>
              <h2>IRV &rarr;</h2>
              <p>Door43-Catalog/hi_irv</p>
            </a>
          </Link>

          <Link href='/u/unfoldingWord/en_tn'>
            <a className={styles.card}>
              <h2>Translation Notes &rarr;</h2>
              <p>unfoldingWord/en_tn</p>
            </a>
          </Link>

          <Link href='/u/unfoldingWord/en_obs'>
            <a className={styles.card}>
              <h2>OBS &rarr;</h2>
              <p>unfoldingWord/en_obs</p>
            </a>
          </Link>

          <Link href='/u/unfoldingWord/en_ta'>
            <a className={styles.card}>
              <h2>Translation Acadamy &rarr;</h2>
              <p>unfoldingWord/en_ta</p>
            </a>
          </Link>
        </div>
      </main>
    </Box>
  )
}

export default Home
