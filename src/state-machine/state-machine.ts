import { State } from "./state";

export class StateMachine<StateEnum, InputType> {
  // type StateType = State<StateEnum, InputType>;

  currentState_: StateEnum;
  stateMap_: Map<StateEnum, State<StateEnum, InputType>>;
  constructor(
    initState: StateEnum,
    states: Array<State<StateEnum, InputType>>
  ) {
    this.currentState_ = initState;
    this.stateMap_ = new Map<StateEnum, State<StateEnum, InputType>>();
    states.forEach((state) => this.stateMap_.set(state.state(), state));
  }

  transition(input: InputType) {
    this.currentState_ =
      this.stateMap_.get(this.currentState_)?.transition(input) ||
      this.currentState_;
  }
}
