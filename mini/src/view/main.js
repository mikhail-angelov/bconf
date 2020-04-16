import { html } from '../lib/lit-html/lit-html.js'
import { styleMap } from '../lib/lit-html/directives/style-map.js'
import { IconButton } from './components/iconButton.js'

export const main = (data, store) => html`
  <div style=${styleMap(styles.container)}>
    <div>
      <div>Room ID: ${data.roomId}</div>
      <button @click=${() => store.onStopConference()}>stop conference</button>
    </div>
    <div>
      ${IconButton(data.muted ? 'fa-volume-mute' : 'fa-volume-up', () => store.onToggleMute())}
      ${IconButton(data.noCam ? 'fa-eye-slash' : 'fa-eye', () => store.onToggleCamera())}
    </div>
    <div>
      local video<br />
      <video id="local_video" autoplay style="width: 120px; height: 90px; border: 1px solid black;"></video>
      <span id="state_span"></span>
    </div>
    remote video<br />
    <div id="remote_container"></div>
  </div>
`

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: 1,
  },
  remoteVideo: {
    width: '240px',
    height: '180px',
  },
}
