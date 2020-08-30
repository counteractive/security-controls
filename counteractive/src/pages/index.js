import React from "react"
import Layout from '../components/layout'
import Index from '../styles/index.module.scss'

const Home = () => {
  return (
    <Layout>
      <div className={Index.intro}>
        <div>The future of efficient security</div>
        <div>Start Mapping</div>
      </div>
      <div className={Index.mainContent}>
        <div className={Index.content}>
          <div>Explore Frameworks</div>
        </div>
        <div className={Index.sidebar}>
          <div>Compare Frameworks</div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
