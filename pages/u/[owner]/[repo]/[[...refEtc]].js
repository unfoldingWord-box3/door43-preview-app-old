import Head from 'next/head'
import dynamic from 'next/dynamic'
// import Link from 'next/link'
import styles from '@styles/Home.module.css'
import { Box } from '@mui/material'
import CircularProgress from '@components/CircularProgress'


const ResourceWorkspace = dynamic(
  () => import('@components/ResourceWorkspace'),
  {
    ssr: false,
    loading: () => <CircularProgress size={180} />,
  },
)

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
      <ResourceWorkspace />
    </Box>
  )
}

export default Home
