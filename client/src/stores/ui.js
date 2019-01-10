import { observable, action } from 'mobx'
import { LOGIN } from '../constants/applicationState'

export default class Ui {
  @observable state = LOGIN

  @action
  setUiState = state => {
    this.state = state
  }
}
