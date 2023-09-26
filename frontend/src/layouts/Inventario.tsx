import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { ModalProducts } from '../components/ModalProducts';
import { ModalDeleteProduct } from '../components/ModalDeleteProduct';
import { Product } from '../interfaces/product.interface';
import { ModalUpdateProduct } from '../components/ModalUpdateProduct';
import { ModalSellProduct } from '../components/ModalSellProduct';
import { LoadProp } from '../interfaces/modalProductsProps';


export const Inventario: React.FC<LoadProp> = ({load}) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [sellModal, setSellModal] = useState<boolean>(false);
    const [data, setData] = useState<Product>({
        id: 0,
        nombre: '',
        marca: '',
        precio: 0,
        stock: 0
    });

    const handleShowP = () => setCreateModal(!createModal);
    const handleShowU = () => setUpdateModal(!updateModal);
    const handleShowD = () => setDeleteModal(!deleteModal);
    const handleShowS = () => setSellModal(!sellModal);

    const getProducts = async (): Promise<void> => {
        const req = await fetch('http://localhost:3000/products');
        const res = await req.json();
        return setProducts(res);
    }

    useEffect(() => {
        getProducts();
    }, [createModal, updateModal, deleteModal, sellModal, load])



    return (
        <>
            <ModalProducts show={createModal} handleShow={handleShowP} />
            <ModalUpdateProduct show={updateModal} handleShow={handleShowU} data={data} />
            <ModalDeleteProduct show={deleteModal} handleShow={handleShowD} data={data} />
            <ModalSellProduct show={sellModal} handleShow={handleShowS} data={data} />
            <div className="header-inv">
                <div>
                    <h1>Productos</h1>
                </div>
                <Button variant="success" onClick={handleShowP}>
                    Nuevo producto
                </Button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Stock</th>
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
                                <i className="bi bi-trash3" style={{ color: 'red' }} onClick={() => { handleShowD(), setData(p) }}></i> <i className="bi bi-pencil-square" style={{ color: '#ffca2c' }} onClick={() => { handleShowU(), setData(p) }}></i> <i className="bi bi-cart-check" style={{ color: '#00c52e' }} onClick={() => { handleShowS(), setData(p) }}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
