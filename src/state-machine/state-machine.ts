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

  transition(input: InputType): StateEnum {
    const nextState = this.stateMap_.get(this.currentState_)?.transition(input);
    this.currentState_ =
      nextState === undefined ? this.currentState_ : nextState;
    return this.currentState_;
  }

  behavior(input: InputType): void {
    this.stateMap_.get(this.currentState_)?.behavior(input);
  }

  transitionAndBehavior(input: InputType): StateEnum {
    let nextState = this.stateMap_.get(this.currentState_)?.transition(input);
    nextState = nextState === undefined ? this.currentState_ : nextState;
    // if this is a transition, call exit and entry behavior for respective states
    if (nextState !== this.currentState_) {
      const currentStateObj = this.stateMap_.get(this.currentState_);
      const nextStateObj = this.stateMap_.get(nextState);
      if (currentStateObj !== undefined && nextStateObj !== undefined) {
        currentStateObj.exitBehavior(input);
        nextStateObj.enterBehavior(input);
      }
    } else {
      // else call standard state behavior
      this.behavior(input);
    }
    this.currentState_ = nextState;
    return this.currentState_;
  }

  currentState(): StateEnum {
    return this.currentState_;
  }
}
