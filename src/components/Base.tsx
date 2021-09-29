import React, {Component} from 'react';

export default class Base extends Component{

  public render(){
    return(
      <div className="base">
        This is the base app, with a click button.
        <button className="button" onClick={() => console.log('Button Clicked')}>
          Click Me!
        </button>
      </div>
    )
  }
}