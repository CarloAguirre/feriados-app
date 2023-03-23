import React from 'react'

import ListGroup from 'react-bootstrap/ListGroup';

export const InfoTable = ({title, fecha, tipo}) => {
  return (
    <ListGroup horizontal className="list">
        <ListGroup.Item><strong>Motivo: </strong>{title}</ListGroup.Item>
        <ListGroup.Item><strong>Fecha: </strong>{fecha}</ListGroup.Item>
        <ListGroup.Item><strong>Tipo: </strong>{tipo}</ListGroup.Item>
    </ListGroup>
  )
}
