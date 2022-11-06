import React, {Suspense}from 'react'
import { Outlet } from 'react-router-dom'
import { Layout} from 'antd';
import Header from './components/Header'
import Canvas from './components/Canvas';


const { Content } = Layout;

function App() {
  return (
    <Layout id='app'>
      <Header />
      <Content>
          <Suspense fallback={<h1>loading</h1>}>
            <Outlet/>
          </Suspense>
      </Content>
      <Canvas></Canvas>
    </Layout>
  )
}


export default App

