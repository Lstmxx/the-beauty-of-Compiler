import { MACHINE_STATE } from './constant';

export type IMachineState = MACHINE_STATE;

export type IToken = {
  type: IMachineState;
  text: string;
};
