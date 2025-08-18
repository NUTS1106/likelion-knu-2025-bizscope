import { Outlet } from "react-router-dom"
import Header from "./Components/Header"
import styled from "styled-components"

const Shell=styled.div`
  height:100vh;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <Shell>
      <Header/>
      <Outlet/>
    </Shell>
  )
}

export default App
