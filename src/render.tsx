import {RendererContext} from '../@types/hyper'
import React, {Component} from '../../../modules/react';
import dayjs from '../modules/dayjs'


class StateComponent extends Component<RendererContext> {
  props: RendererContext;

  constructor(props) {
    super(props)
  }

  startClock() {
    const timeFormat = this.props.userConfig.getValue('widgets', 'hyper_clock', 'text') as string
    const timeContainer = document.querySelector('.hyperclock.wrapper .time')
    timeContainer.textContent = dayjs().format(timeFormat)
    setTimeout(()=>{
      this.startClock()
    }, 1000)
  }

  componentDidMount() {
    // decided to go with useEffect / didMount
    // don't want the entire react rendering after each sec
    this.startClock()
  }

  render() {

    const showCallendar = this.props.userConfig.getValue('widgets', 'hyper_clock', 'showcallendar')

    return (
      <div 
      className="hyperclock wrapper"
      onClick={(e)=>{
        const target = document.querySelector('.hyperclock.wrapper')
        const bounds = target.getBoundingClientRect()
        this.props.api.ipcRenderer.send('openHyperCalendar', {x: bounds.x, w: bounds.width})
      }}
      >
        <p className="time"></p>
      </div>
    );
  }
}


// Hyper carries our api & other stuff inside `this` context.
// React contructor doesn't pass the values, so we call it as a function
// Check hyper-menu module for a stateless component example
export default function() {
  return <StateComponent
    key={'hyper-clock'} 
    userConfig={this.config} 
    api={this.api}
    {...this.props}
  />
}

export const styles = ['styles/index.css']