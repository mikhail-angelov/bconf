import { html } from '../lib/lit-html/lit-html.js'
import { styleMap } from '../lib/lit-html/directives/style-map.js'
import { main } from './main.js'
import { audioBind } from './audioBind.js'

const starter = (store) => html`<div style=${styleMap(styles.starter)}>
  <button @click=${() => store.onStartConference()}>start conference</button>
</div>`

// ${store.webrtc.streams.map(stream => html`<audio autoplay test=${audioBind(stream.stream)}></audio>`)}

export const view = (data, store) => html`<div style=${styleMap(styles.container)}>
  ${data.roomId ? main(data, store) : starter(store)}
</div>`

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  starter: {},
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
}
