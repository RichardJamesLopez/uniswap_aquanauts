import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';

import Chart from '../Chart';
import Sidebar from '../Sidebar';

class Home extends Component {
  componentDidMount() {
    fetchData();
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Chart />
      </div>
    );
  }
}

const mapStateToProps = ({ api }) => ({
  api,
});

export default connect(mapStateToProps, { fetchData })(Home);
