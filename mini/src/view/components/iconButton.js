import { html } from '../../lib/lit-html/lit-html.js'
import { styleMap } from '../../lib/lit-html/directives/style-map.js'

export const IconButton = (icon, handler) =>
  html`<button @click=${handler} style=${styleMap(styles.button)}><i class="fas ${icon}"></i></button>`

const styles = {
  button: {
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    padding: '-1px',
    margin: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none'
  },
}
