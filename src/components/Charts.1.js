import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2'
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
// import './css/Account.css';


class BarGraph extends Component {
    constructor(){
        super()
        this.state = {
            data: [],
            categories: [],
            singleCategories: [],
            data1: {}
    }
}

componentDidMount() {
    axios.get('/user-data/').then(response => {
        if (response.data.user) {
            this.props.login(response.data.user);
            // console.log(response.data.user)
        }
    });
    axios.get('/user-tests-results').then(response => {
        // console.log(response)
        // console.log(this.state.data)
        response.data.map((item, index) => {
            this.setState({
                categories: [...this.state.categories, item.category],
                data: response.data
            })
            return ''
        })
    }).then(() => {
        // console.log(this.state.categories)
        const myArray = this.state.categories
        const unique = myArray.filter((v, i, a) => a.indexOf(v) === i);
        this.setState({
            singleCategories: unique,
        })
    }).then(() => {
        // console.log(this.state.singleCategories)
        var data1 = {labels: [],

                        datasets: [
                        {
                        label: 'Avg Percent/Subject',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(255,99,132,0.7)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [],
                        }
                        ]
                    };

        this.state.singleCategories.map((item, index) => {
            // console.log(this.state.singleCategories)
            data1.labels.push(item)
            var arr = []
            var average = ''
            this.state.data.map((i, ind) => {
                
                if (i.category === item) {
                    arr.push(i.percent)
                    return ''
                } else return ''
            })
            average = arr.reduce(( acc, cur ) => acc + cur, 0) / arr.length
            data1.datasets[0].data.push(average)
            return ''
        })
        this.setState({
            data1: data1
        })
        }).then(() => {
            // console.log(this.state.data1)
        })
    }

          
    render() {
        return (
            <div className='chart'>
                <HorizontalBar 
                    data={this.state.data1} redraw
                    //   width={450}
                    //   height={360}
                    options={{
                        maintainAspectRatio: false,
                        scales:{
                            xAxes:[{
                                ticks:{
                                    min:0,
                                    max:100,
                                },
                            }]
                        }
                    }}
                />
            </div>
        );
    }
}


const mapDispatchToProps = {
    login: login,


};

export default connect(null,  mapDispatchToProps )(BarGraph);