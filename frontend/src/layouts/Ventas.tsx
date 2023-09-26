import { useEffect, useState } from 'react';
import { Sell } from '../interfaces/sell.interface';
import { ModalCancelSell } from '../components/ModalCancelSell';
import { LoadProp } from '../interfaces/modalProductsProps';

export const Ventas: React.FC<LoadProp> = ({load}) => {

    const [show, setShow] = useState<boolean>(false);
    const [data, setData] = useState<Sell>({
        id: 0, cantidad: 0, fecha: '', productId: 0, total: 0, tipo: '', ProductModel: {id: 0, marca: '', nombre: '', precio: 0, stock: 0}
    });
    const [ventas, setVentas] = useState<Sell[]>([]);

    const handleShow = () => setShow(!show);

    const getVentas = async () => {
        const req = await fetch('http://localhost:3000/sells');
        const res = await req.json();
        return setVentas(res);
    };

    useEffect(() => {
        getVentas();
    }, [load, show]);

    return (
        <>  
            <ModalCancelSell show={show} handleShow={handleShow} data={data}/>
            <div className="header-inv">
                <div>
                    <h1>Mis ventas</h1>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Total</th>   
                        <th scope="col">Acciones</th>   
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((p, i) => (
                        <tr key={i}>
                            <th>{p.id}</th>
                            <td>{p.ProductModel.nombre}</td>
                            <td>{p.cantidad}</td>
                            <td>{p.tipo}</td>
                            <td>{p.fecha}</td>
                            <td>{p.total}</td>
                            <td><i className='bi bi-x-circle' style={{color: 'red'}} onClick={(()=>{handleShow(), setData(p)})}></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
