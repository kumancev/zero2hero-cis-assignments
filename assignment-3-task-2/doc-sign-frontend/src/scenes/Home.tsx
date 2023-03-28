import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Main from "../components/Main/Main"

import './index.scss'

function Home() {
  return (
    <div className="wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Home