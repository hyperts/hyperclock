import {MainAPI, Config} from '../@types/hyper'

export default function(api: MainAPI, config: Config) {
  // This is our init function
  // Everything inside the default export runs right after the widget is recognized by hyperbar.

  // Here you can create new ipcEvents, create new windows and other main process related tasks
  // Returning something from this function is useless.
}