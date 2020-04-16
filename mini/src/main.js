import { render } from './lib/lit-html/lit-html.js'
import { view } from './view/view.js'
import { Store } from './store.js'
import { processor } from './processor.js'

const store = new Store()
store.on((data) => {
  render(view(data, store), document.getElementById('root'))
})
processor(store)
store.init()
