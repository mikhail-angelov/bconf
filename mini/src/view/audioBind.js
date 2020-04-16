import { directive } from '../lib/lit-html/lit-html.js'

export const audioBind = directive((stream) => (part) => { 
  part.committer.element.srcObject = stream //not nice, but it works
});