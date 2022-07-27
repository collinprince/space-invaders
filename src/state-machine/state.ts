import { UserInput } from "../input-handling";

export type StateTransition<StateEnum, InputType> = (
  input: InputType
) => StateEnum;

export type StateBehavior<InputType> = (input: InputType) => void;

export class State<StateEnum, InputType> {
  private state_: StateEnum;
  private transition_: StateTransition<StateEnum, InputType>;
  private behavior_: StateBehavior<InputType>;
  constructor(
    state: StateEnum,
    transition: StateTransition<StateEnum, InputType>,
    behavior: StateBehavior<InputType>
  ) {
    this.state_ = state;
    this.transition_ = transition;
    this.behavior_ = behavior;
  }

  state() {
    return this.state_;
  }

  transition(input: InputType): StateEnum {
    return this.transition_(input);
  }

  // behavior to perform when in specified state
  behavior(input: InputType): void {
    this.behavior_(input);
  }
}
