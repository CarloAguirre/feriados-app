import React, { useState, useEffect } from 'react';

import "../index.css"
import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css";

import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';

import { InfoTable } from './InfoTable';
import {feriadosFetch} from '../helpers/feriadosFetch';

export const MyApi = ()=> {

    const getCryptos = async()=>{
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        const data = await res.json()

        console.log(data)
    }
    getCryptos()

    const url = "https://api.victorsanmartin.com/holidays.json"
    
    // Primer Slide: Proximo Feriado
    const aDayMilliseconds = 86400000
    const [today, setToday] = useState(new Date().toISOString().split('T')[0]) 
    const [time, setTime] = useState();
    const [title, setTitle] = useState("")
    const [fecha, setFecha] = useState("")
    const [tipo, setTipo] = useState("")
    const [data, setData] = useState([])
    
    setInterval(()=>{ 
        setToday(new Date().toISOString().split('T')[0])
    }, 3600000)
    
    useEffect(() => {
        const getData = async()=>{
            await feriadosFetch(url, setTime, setTitle, setFecha, setTipo, today, setData)
        }
        getData()
    }, [today])
    
    // Segundo Slide: filtro por mes
    const [busqueda, setBusqueda] = useState()
    const [feriadoArray, setFeriadoArray] = useState([])
    
    const onChangeHandler = ({target})=>{
        const {value} = target
        setBusqueda(value)
    }

    useEffect(() => {
        //En este punto optimizé el codigo que figura en el video.
        const filter = data.filter(feriado => feriado.date.split("-")[1] === busqueda)
        setFeriadoArray(filter)
    }, [busqueda])
    

    return (
        <>

    <Carousel indicators = {null} interval = {null}>
      <Carousel.Item>
        {
            (data !== [])
                ?       <div className='calculadora' >
                            <h1>Faltan</h1>
                            {
                                (time === 0)
                                    ? <h2>Es Hoy!</h2>
                                    : <><h2>{time / aDayMilliseconds} días!</h2>
                                    <InfoTable title={title} fecha={fecha} tipo={tipo} /></>
                                
                            }
                        </div>
                  : <div className='calculadora' >
                        <h1>Cargando datos...</h1>                 
                    </div>
        }

      </Carousel.Item>
      <Carousel.Item>
        <form className='month-form' >
        <h1 className='mb-5'>Buscar Feriados</h1>
        <Form.Select size="lg" onChange={onChangeHandler} defaultValue={"03"}>
            <option value={"01"} >Enero</option>
            <option value={"02"}>Febrero</option>
            <option value={"03"}>Marzo</option>
            <option value={"04"}>Abril</option>
            <option value={"05"}>Mayo</option>
            <option value={"06"}>Junio</option>
            <option value={"07"}>Julio</option>
            <option value={"08"}>Agosto</option>
            <option value={"09"}>Septiembre</option>
            <option value={"10"}>Octubre</option>
            <option value={"11"}>Noviembre</option>
            <option value={"12"}>Diciembre</option>
        </Form.Select>
        </form>
      {
        (feriadoArray.length !== 0)? 
            <table className="table container feriados-table mt-4">
            <thead>
                <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Motivo</th>
                <th scope="col">Tipo</th>                    
                </tr>
            </thead>
            <tbody>
    
                {
                    feriadoArray.map((feriado, index)=>{  
                        return <tr key={index}>
                        <th scope="row">{feriado.date}</th>
                        <td>{feriado.title}</td>
                        <td>{feriado.type}</td>
                    </tr>                      
                    })
                }
                
            </tbody>
            </table>
    
        : <div className="fail-img">
            <img src={'fail.png'}></img>
            <h3 className='mt-4'>No hay feriados este mes!</h3>
        </div> 
    }
      </Carousel.Item>
    </Carousel>
   
        </>
        
    );
}