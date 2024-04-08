import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Coins from "./Coins"
import CoinDetails from "./CoinDetails"
import Navbar from "./Navbar"
const App=() =>{

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Coins/>}></Route>
        <Route path='/details/:id' element={<CoinDetails/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
