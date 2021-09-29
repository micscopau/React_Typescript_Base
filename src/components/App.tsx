import React, { Component } from 'react';
import Base from './Base';

export default class App extends Component {

  public render() {
    return (
      <div className='theme-dark'>
        <div className='app'>
          Hello World!
        </div>
        <Base />
      </div>
    )
  }
}