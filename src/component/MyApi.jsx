import React, { useState, useEffect } from 'react';

import "../index.css"
import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css";

import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { InfoTable } from './InfoTable';
import {feriadosFetch} from '../helpers/feriadosFetch';

export const MyApi = ()=> {

    // Primer Slide: Proximo Feriado
    const aDayMilliseconds = 86400000
    const [today, setToday] = useState(new Date().toISOString().split('T')[0])
    setInterval(()=>{
        setToday(new Date().toISOString().split('T')[0])
    }, 3600000)

    const [time, setTime] = useState();
    const [title, setTitle] = useState("")
    const [fecha, setFecha] = useState("")
    const [tipo, setTipo] = useState("")
    const [data, setData] = useState([])

    
    const url = "https://api.victorsanmartin.com/holidays.json"
    
    const getData = async()=>{
        await feriadosFetch(url, setTime, setTitle, setFecha, setTipo, today, setData)
    }
    
    useEffect(() => {
        getData()
    }, [today])

    // Segundo Slide: filtro por mes
    const [busqueda, setBusqueda] = useState("")
    const [feriadoArray, setFeriadoArray] = useState([])

    const onChangeHandler = ({target})=>{
        const {value} = target
        setBusqueda(value)
    }

    const onSubmitHandler = (event)=>{
        event.preventDefault()    
        for(let feriado of data){
            if(Number(feriado.date.split('-')[1]) === Number(busqueda)){
                setFeriadoArray([...feriadoArray, feriado])
            }
        }    
    }
    return (
        <>

    <Carousel indicators = {null} interval = {null}>
      <Carousel.Item>
      <div className='calculadora' >
            <h1>Faltan</h1>
            {
                (time == 0)
                    ? <h2>Es Hoy!</h2>
                    : <h2>{time / aDayMilliseconds} días!</h2>
                
            }
            </div>
            <InfoTable title={title} fecha={fecha} tipo={tipo} />
      </Carousel.Item>
      <Carousel.Item>
      <form className='month-form' onSubmit={onSubmitHandler}>
      <h1 className='mb-5'>Buscar Feriados</h1>
      <Form.Select size="lg" onChange={onChangeHandler}>
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
      <Button type="submit" className='mt-4' variant="light">Buscar</Button>
      </form>
      </Carousel.Item>
    </Carousel>
    {
        (feriadoArray.length != 0)? 
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
                    feriadoArray.map(feriado=>{  
                    return <tr key={feriado.date}>
                            <th scope="row">{feriado.date}</th>
                            <td>{feriado.title}</td>
                            <td>{feriado.type}</td>
                        </tr>    
                    })
                }
                
            </tbody>
            </table>
    
        :null

    }
        </>
        
    );
}