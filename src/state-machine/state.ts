import { UserInput } from "../input-handling";

export type StateTransition<StateEnum, InputType> = (
  input: InputType
) => StateEnum;

export class State<StateEnum, InputType> {
  private state_: StateEnum;
  private transition_: StateTransition<StateEnum, InputType>;
  constructor(
    state: StateEnum,
    transition: StateTransition<StateEnum, InputType>
  ) {
    this.state_ = state;
    this.transition_ = transition;
  }

  state() {
    return this.state_;
  }

  transition(input: InputType) {
    return this.transition_(input);
  }
}
