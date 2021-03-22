import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';
import { Line } from 'react-chartjs-2';
//import { Bar } from 'react-chartjs-2';
import './Chart.css';


const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

class Chart extends Component {
  componentDidMount() {
    fetchData();
  }
  render() {
    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ api }) => ({
  api,
});

export default connect(mapStateToProps, { fetchData })(Chart);
