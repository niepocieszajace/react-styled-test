import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 30px;
  padding: 20px;
  display: flex;
  border: solid 1px #000;

  justify-content: space-between;
  align-items: flex-start;
`
const Metadata = styled.div`
  display: flex;
  flex-direction: column;
`

function Planet(props) {
  const { name, gravity, created } = props.planet
  return (
    <Container>
      <h2>{name}</h2>
      <Metadata>
        <span>Gravity: {gravity}</span>
        <span>Create date: {created}</span>
      </Metadata>
    </Container>
  )
}

export default Planet