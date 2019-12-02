import React, { Component } from 'react';
import axios from 'axios';
import Planet from './Planet';
import moment from 'moment';
import styled from 'styled-components';

const Container = styled.div`
  width: 70%;
  margin: 2rem auto;
`;

const StyledInput = styled.input`
  display: block;
  margin: 2rem auto 0;
  width: 250px;
`;

class ListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      filter: '',
    };
  }

  componentDidMount() {
    const URL = 'https://swapi.co/api/planets';
    axios
      .get(URL)
      .then(res =>
        res.data.results.map(el => ({
          name: el.name,
          gravity: el.gravity.split(' ')[0],
          created: moment(el.created).format('hh:mm, d-M-YYYY'),
        }))
      )
      .then(res =>
        this.setState({
          data: res,
        })
      );
  }

  handleInputChange = event => this.setState({ filter: event.target.value });

  filterPlanets = planets => {
    const { filter } = this.state;

    return planets.filter(el => this.doesContainsPhrase(filter, el));
  };

  doesContainsPhrase = (phrase, object) => {
    const keys = Object.keys(object)

    return keys.find(key =>
      object[key].toLowerCase().includes(phrase.toLowerCase())
    )
  }

  renderPlanetsWithFilter = planets => this.filterPlanets(planets).map(el => <Planet planet={el} key={el.name} />);

  render() {
    const { data } = this.state;
    return (
      <Container>
        <StyledInput placeholder="Filter..." type="text" onChange={this.handleInputChange} />
        {data && this.renderPlanetsWithFilter(data)}
      </Container>
    );
  }
}

export default ListContainer;
