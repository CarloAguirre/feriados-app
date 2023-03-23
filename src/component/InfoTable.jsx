import React from 'react'

import ListGroup from 'react-bootstrap/ListGroup';
import '../App.css'


export const InfoTable = ({title, fecha, tipo}) => {
  return (
    <ListGroup horizontal className="list">
        <ListGroup.Item className="list-item"><strong>Motivo: </strong>{title}</ListGroup.Item>
        <ListGroup.Item className="list-item"><strong>Fecha: </strong>{fecha}</ListGroup.Item>
        <ListGroup.Item className="list-item"><strong>Tipo: </strong>{tipo}</ListGroup.Item>
    </ListGroup>
  )
}
