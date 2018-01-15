import React, { Component } from 'react';
import Header from './Header';
import './css/Results.css';

export default class Results extends Component {
    render() {
        return (
            <div className='results-main'>
                <Header />

                <div className='results-title'>
                    <div className='results-to-account'>Account</div>
                    <div className='results-main-title'>Flash-Study Results</div>
                    <div className='results-try-again'>Train Again</div>
                </div>

                <div className='results-content'>
                    <div className='results-left'>
                        <div className='results-label'>
                            <div className='results-stats-1'>Right</div>
                            <div className='results-stats-2'>Description</div>
                            <div className='results-stats-3'>Correct</div>
                            <div className='results-stats-4'>Answered</div>
                        </div>
                        <div className='results-stats'>
                            <div className='results-stats-1'>Right</div>
                            <div className='results-stats-2'>Description</div>
                            <div className='results-stats-3'>Correct</div>
                            <div className='results-stats-4'>Answered</div>
                        </div>
                        <div className='results-stats'>
                            <div className='results-stats-1'>Right</div>
                            <div className='results-stats-2'>Description</div>
                            <div className='results-stats-3'>Correct</div>
                            <div className='results-stats-4'>Answered</div>
                        </div>
                        <div className='results-stats'>
                            <div className='results-stats-1'>Right</div>
                            <div className='results-stats-2'>Description</div>
                            <div className='results-stats-3'>Correct</div>
                            <div className='results-stats-4'>Answered</div>
                        </div>
                    </div>
                    
                    <div className='results-right'>
                        <div className='results-result'>Congrats!!!</div>
                        <div className='results-percent'>
                            <div>70%</div>
                            <div>Correct</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}