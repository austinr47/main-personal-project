import React, { Component } from 'react';
import Header from './Header';
import './css/Trainings.css'

export default class Trainings extends Component {
    render() {
        return (
            <div className='trainings-main'>
                <Header />
                <div className='trainings-content'>
                    <div className='trainings-category'>
                    Training Category One</div>
                    <div className='trainings-category'>
                    Training Category Two</div>
                    <div className='trainings-category'>
                    Training Category Three</div>
                    <div className='trainings-category'>
                    Training Category Four</div>
                    <div className='trainings-category'>
                    Training Category Five</div>
                    <div className='trainings-category'>
                    Training Category Six</div>
                </div>
            </div>
        );
    }
}