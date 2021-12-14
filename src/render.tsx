import React, {Component} from '../../../modules/react';
import dayjs from '../modules/dayjs'

interface Props {
  userConfig: any,
  ipcRenderer: any
}

class StateComponent extends Component<Props> {
  props: any;

  constructor(props) {
    super(props)
  }

  startClock() {
    const timeFormat = this.props.userConfig.getValue('widgets', 'hyper_clock', 'text')
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
      <div className="hyperclock wrapper">
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
    ipcRenderer={this.api.ipcRenderer} 
    {...this.props}
  />
}

export const styles = ['styles/index.css']