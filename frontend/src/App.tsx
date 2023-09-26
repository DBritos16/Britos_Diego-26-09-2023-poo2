import { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import './style.css'
import { Inventario } from './layouts/Inventario'
import { Ventas } from './layouts/Ventas'

function App() {
  const [load, setLoad] = useState(false);
  
  return (
    <>
      <div className="container">
        <div className='header'>
          <h1>Tienda de Productos</h1>
        </div>
        <div>
          
          <Tabs onClick={()=> setLoad(!load)}
            defaultActiveKey="inventario"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey={'inventario'} title={'Inventario'}>
              <Inventario load={load}/>
            </Tab>
            <Tab eventKey={'ventas'} title={'Ventas'}>
              <Ventas load={load}/>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default App
