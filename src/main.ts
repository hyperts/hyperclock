import {MainContext} from '../@types/hyper'

export default function() {
  const context: MainContext = this

  let {calcX, calcW, calcContainerW} = {calcX:0, calcW:0, calcContainerW: 0}
  let screenW = 0
  let screenH = 0

  context.api.ipcMain.on('openHyperCalendar', (e, data) => {
    console.log("Request to open", data)
    if (!context.api.windows?.hypercalendar) {
      calcX = data.x
      calcW = data.w
      calcContainerW = data.w

      context.api.windows['hypercalendar'] = new context.api.browserWindow({
        width: 340,
        height: 100,
        x: 0,
        y: 0,
        frame: false,
        thickFrame: false,
        resizable: false,
        skipTaskbar: true,
        focusable: true,
        fullscreenable: false,
        show: true,
        minimizable: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
      })
  
      context.api.windows?.hypercalendar.loadURL('widgets://hyperclock/assets/calendar.html')

      context.api.windows?.hypercalendar.on('close', () =>{
        delete context.api.windows?.hypercalendar
      })

      context.api.windows?.hypercalendar.on('blur', () =>{
        setTimeout(()=>{
          context.api.windows?.hypercalendar?.close()
          delete context.api.windows?.hypercalendar
        }, 100)
      })


      context.api.ipcMain.emit('getScreenSize')

    } else {
      context.api.windows?.hypercalendar.close()
      delete context.api.windows?.hypercalendar
    }
  })


  // @ts-expect-error -- When emmiting, event i not sent
  // arguments becames the first argument from now on.
  context.api.ipcMain.on('sendScreenSize', (size:{w: number, h: number}) => {
    //@ts-ignore
    if (!size) { return }
    if (!context.api.windows?.hypercalendar) { return }

    screenW = size.w
    screenH = size.h

    const {w,h} = size

    const verticalMargin = context.config.getValue('general', 'position', 'vertical-margin') as number
    const height = context.config.getValue('appearence', 'sizes', 'height') as number

    const calculateY = this.config.getValue('general', 'position', 'dock-pos') === "top" 
    ? height + (verticalMargin * 2)
    : h - verticalMargin - height - context.api.windows?.hypercalendar.getContentSize()[1] - 9

   
    context.api.windows?.hypercalendar.setPosition(Math.round(calcX), calculateY)

  })

  // This one comes from the renderer, so event is here.
  context.api.ipcMain.on('resizeHyperCalendar', (e, size:{w: number, h: number}) => {

    const {w,h} = size

    if (!context.api.windows?.hypercalendar) { return }

    const [currentW, currentH] = context.api.windows.hypercalendar.getSize()
    const [currentX, currentY] = context.api.windows.hypercalendar.getPosition()

    const difference = currentH > h 
      ? currentH - h
      : h - currentH

    context.api.windows.hypercalendar.setSize(Math.round(currentW), Math.round(h))

    if ( currentX + currentW > screenW ) {      
      context.api.windows.hypercalendar.setPosition(Math.round(screenW - w), Math.round(currentY) )
    } else if (currentX - currentW/2 > 0) {
      context.api.windows.hypercalendar.setPosition(Math.round(currentX + calcW / 2 - currentW / 2), Math.round(currentY) )
    }

    if (difference > 0 && this.config.getValue('general', 'position', 'dock-pos') !== "top") {
      const [currentX, currentY] = context.api.windows.hypercalendar.getPosition()

      context.api.windows.hypercalendar.setPosition(Math.round(currentX), Math.round(currentY - difference) )
    }

  })
}