import { useEffect, useState } from 'react';
import './style.css'
import { Button } from 'react-bootstrap';
import { ModalProducts } from './components/ModalProducts';
import { ModalDeleteProduct } from './components/ModalDeleteProduct';
import { Product } from './interfaces/Product.interface';

function App() {

  const [products, setProducts] = useState<Product[]>([]);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [data, setData] = useState<Product>({
    id: 0,
    nombre: '',
    marca: '',
    precio: 0,
    stock: 0
  });

  const handleShowP = () => setCreateModal(!createModal);
  const handleShowD = () => setDeleteModal(!deleteModal);
  
  const getProducts = async (): Promise<void> => {
    const req = await fetch('http://localhost:3000/products');
    const res = await req.json();
    return setProducts(res);
  }

  useEffect(() => {
    getProducts();
  }, [createModal, deleteModal])

  return (
    <>
      <div className="container">
        <div className="header">
          <div>
            <h1>Inventory products</h1>
          </div>
          <Button variant="success" onClick={handleShowP}>
            Nuevo producto
          </Button>
        </div>
        <div>
          <ModalProducts show={createModal} handleShow={handleShowP}/>
          <ModalDeleteProduct show={deleteModal} handleShow={handleShowD} data={data}/>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">nombre</th>
                <th scope="col">marca</th>
                <th scope="col">precio</th>
                <th scope="col">stock</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <th>{p.id}</th>
                  <td>{p.nombre}</td>
                  <td>{p.marca}</td>
                  <td>{p.precio}</td>
                  <td>{p.stock}</td>
                  <td id='action'>
                    <i className="bi bi-trash3" style={{color: 'red'}} onClick={()=> {handleShowD(), setData(p)}}></i> <i className="bi bi-pencil-square" style={{color: '#ffca2c'}}></i> <i className="bi bi-cart-check" style={{color: '#00c52e'}}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
