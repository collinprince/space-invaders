import { UserInput } from "../input-handling";
import { InputType } from "./game-state-machine";

export type StateTransition<StateEnum, InputType> = (
  input: InputType
) => StateEnum;

export type StateBehavior<InputType> = (input: InputType) => void;
type EnterAndExitBehavior<InputType> = {
  enterBehavior?:  StateBehavior<InputType>;
  exitBehavior?: StateBehavior<InputType>;
};

function NoOpBehavior<InputType>() {}

export class State<StateEnum, InputType> {
  private state_: StateEnum;
  private transition_: StateTransition<StateEnum, InputType>;
  private behavior_: StateBehavior<InputType>;
  private enterBehavior_: StateBehavior<InputType>;
  private exitBehavior_: StateBehavior<InputType>;
  constructor(
    state: StateEnum,
    transition: StateTransition<StateEnum, InputType>,
    behavior: StateBehavior<InputType>,
    {
      enterBehavior = NoOpBehavior<InputType>,
      exitBehavior = NoOpBehavior,
    }: EnterAndExitBehavior<InputType> = { enterBehavior: NoOpBehavior, exitBehavior: NoOpBehavior }
  ) {
    this.state_ = state;
    this.transition_ = transition;
    this.behavior_ = behavior;
    this.enterBehavior_ = enterBehavior;
    this.exitBehavior_ = exitBehavior;
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

  enterBehavior(input: InputType): void {
    this.enterBehavior_(input);    
  }

  exitBehavior(input: InputType): void {
    this.exitBehavior_(input);
  }
}
