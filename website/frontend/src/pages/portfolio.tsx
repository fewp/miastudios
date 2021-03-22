import { withUrqlClient } from 'next-urql'
import styles from '../../public/css/pages/portfolio.module.css'
import { Layout } from '../components/Layout'
import { useGetAllProductsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Portfolio = () => {
  const [{ data }] = useGetAllProductsQuery()

  return (
    <Layout style="indexWrapper">
      {/* {!data ? (
        <div>Loading...</div>
      ) : ( */}
      <div className={styles.galleryContainer}>
        <img src="/assets/img/uploads/builds/1.png" alt="Gallery image 1" />
        <img src="/assets/img/uploads/builds/8.png" alt="Gallery image 2" />
        <img src="/assets/img/uploads/builds/9.png" alt="Gallery image 3" />
        <img src="/assets/img/uploads/builds/10.png" alt="Gallery image 4" />
        <img src="/assets/img/uploads/builds/11.png" alt="Gallery image 5" />
        <img src="/assets/img/uploads/builds/2.png" alt="Gallery image 2" />
        <img src="/assets/img/uploads/builds/3.png" alt="Gallery image 3" />
        <img src="/assets/img/uploads/builds/4.png" alt="Gallery image 4" />
        <img src="/assets/img/uploads/builds/5.png" alt="Gallery image 5" />
        <img src="/assets/img/uploads/builds/6.png" alt="Gallery image 6" />
        <img src="/assets/img/uploads/builds/7.png" alt="Gallery image 1" />
      </div>
      {/* )} */}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Portfolio)
