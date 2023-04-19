import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { StoreContext } from '@context/StoreContext'
import { RepositoryApi, OrganizationApi } from 'dcs-js'
import createResource from '@utils/createResource';

export const AppContext = React.createContext({});


export default function AppContextProvider({
  children,
}) {
  const [ltStState, setLtStState] = useState('')
  const [refresh, setRefresh] = useState(true)
  const [repoClient, setRepoClient] = useState(null)
  const [organizationClient, setOrganizationClient] = useState(null)
  const [resources, setResources] = useState([])
  // const [ep, /*setEp*/] = useState(new EpiteletePerfHtml({
  //   proskomma: null, docSetId: "unfoldingWord/en_ltst", options: { historySize: 100 }
  // }))
  // const [ep, setEp] = useState({})

  const {
    state: {
      server,
    },
    actions: {
      setCurrentLayout,
    }
  } = useContext(StoreContext)

  const router = useRouter()
  const { path } = router.query

  const getApiConfig = ({ basePath = "https://qa.door43.org/api/v1/" }) => ({
    basePath: basePath?.replace(/\/+$/, ""),
  })

  const _setResources = (value) => {
    setResources(value)
    _setRefresh(true)
  }

  const _setRefresh = () => {
    setRefresh(true)
    setCurrentLayout(null)
  }

  useEffect(() => {
    console.log("IN PATH EFFECT: ", path)
    const handleResource = async () => {
      let owner, repo, ref, url, source = ''
      if (path[0].startsWith('http')) {
        url = path.join('/')
        source = 'url'
      } else {
        [owner, repo, ref] = path
        source = 'dcs'
        if (! ref)
          ref = 'master'
      }
      console.log("HERE:", owner, repo, ref)
      const resource = await createResource({owner, repo, ref, source, url, repoClient})
      console.log("resource: ", resource)
      console.log("HERE2")
      setResources([resource])
    }

    const handleBibleReference = () => {
      const [bookId, chapter, verse] = path.slice(3)
      if (bookId) {
        setBibleReference({bookId, chapter: chapter || '1', verse: verse || '1'})
      }
    }

    console.log("ROUTER PATH: ", path)
    if (router.isReady && path && path.length) {
      console.log("ROUTER PATH", path)
      handleResource().catch(console.error)
      handleBibleReference()
    }
  }, [router.isReady, path])

  useEffect(() => {
    if (refresh && resources.length) {
      const _resources = []
      resources.forEach(resource => {
        if (resource.source === 'dcs') {
          resource.content = 'Loading...'
          resource.rawContent = ''
          resource.commit = null
          resource.commitId = ''
        }
        _resources.push(resource)
      })
      setRefresh(false)
      console.log("HERE1")
      setResources(_resources)
    }
  }, [resources, refresh])

  useEffect(() => {
    const _configuration = getApiConfig({ basePath: `${server}/api/v1/` });
    setRepoClient(new RepositoryApi(_configuration))
    setOrganizationClient(new OrganizationApi(_configuration))
  }, [server])

  // create the value for the context provider
  const context = {
    state: {
      resources,
      ltStState,
      repoClient,
      organizationClient,
    },
    actions: {
      setResources: _setResources,
      setRefresh: _setRefresh,
      setLtStState,
    }
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  /** Children to render inside of Provider */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
