export default class Mediator {
  static state = {
    receiveData: (data) => {}
  };

  static handle = (funcName, args) => {
    Mediator.state[funcName].apply(this, args);
  };

  static set = (state) => {
    Object.assign(Mediator.state, state);
  }
}