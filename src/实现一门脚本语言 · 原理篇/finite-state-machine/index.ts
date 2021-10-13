import { IMachineState, IToken } from './type';
import { MACHINE_STATE } from './constant';

/**
 * 判断当前字符串是否是字母
 * @param {string} ch 当前字符
 * @returns {boolean} 结果
 */
const isAlpha = (ch: string): boolean => {
  const asciiCode = ch.charCodeAt(0);
  return (asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122);
};

/**
 * 判断当前字符串是否是数字
 * @param {string} ch 当前字符
 * @returns {boolean} 结果
 */
const isDigit = (ch: string): boolean => {
  return ch.trim() !== '' && Number.isInteger(Number(ch));
};
/**
 * 有限状态机的状态
 */
 let state: IMachineState = MACHINE_STATE.INITIAL;
 let token: IToken = {
   text: '',
   type: state,
 };
/**
 * 初始化token
 * @param {string} ch 当前字符
 */
const initToken = (ch: string) => {
  let _state: IMachineState;
  if (isAlpha(ch)) {
    _state = MACHINE_STATE.ID;
  } else if (isDigit(ch)) {
    _state = MACHINE_STATE.NUMERIC_LITERAL;
  } else if (ch === '>') {
    _state = MACHINE_STATE.GT;
  } else {
    _state = MACHINE_STATE.INITIAL;
  }
  if (_state !== token.type) {
    console.log(token);
  }
  token.type = _state;
  token.text = ch;
  return _state;
};
/**
 * 有限状态机
 * @param {string} sentence 当前语句
 */
const finiteStateMachine = (sentence: string) => {
  const len = sentence.length;
  for(let i = 0; i < len; i++) {
    const ch = sentence[i];
    switch (state) {
      case MACHINE_STATE.INITIAL:
        state = initToken(ch);
        break;
      case MACHINE_STATE.ID:
        if (isAlpha(ch) || isDigit(ch)) {
          token.text += ch;
        } else {
          state = initToken(ch);
        }
        break;
      case MACHINE_STATE.GT:
        if (ch === '=') {
          token.type = MACHINE_STATE.GE;
          state = MACHINE_STATE.GE;
          token.text += ch;
        } else {
          state = initToken(ch);
        }
        break;
      case MACHINE_STATE.GE:
        state = initToken(ch);
        break;
      case MACHINE_STATE.NUMERIC_LITERAL:
        if (isDigit(ch)) {
          token.text += ch;
        } else {
          state = initToken(ch);
        }
        break;
      default:
        break;
    }
  }
  console.log(token);
};

// 测试
const sentence = 'age >= 45';
finiteStateMachine(sentence);