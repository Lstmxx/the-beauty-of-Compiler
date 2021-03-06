/**
 * 词法分析器
 * 词法分析器的工作是低级别的分析：将字符或者字符序列转化成记号。
 * 在谈论词法分析时，使用术语“词法记号”（简称记号）、“模式”和“词法单元”表示特定的含义。
 */

import { IMachineState, IToken } from './type';
import { MACHINE_STATE, tokenReg } from './constant';

/**
 * 判断当前字符串是否是字母
 * @param {string} ch 当前字符
 * @returns {boolean} 结果
 */
const isAlpha = (ch: string): boolean => {
  // const asciiCode = ch.charCodeAt(0);
  // return (asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122);
  return tokenReg.ID.test(ch);
};

/**
 * 判断当前字符串是否是数字
 * @param {string} ch 当前字符
 * @returns {boolean} 结果
 */
const isDigit = (ch: string): boolean => {
  return tokenReg.NUMERIC_LITERAL.test(ch);
};
/**
 * 有限状态机的状态
 */
let state: IMachineState = MACHINE_STATE.INITIAL;
let token: IToken = {
  text: '',
  type: state,
};
let tokenList: IToken[] = [];
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
  } else if (ch === tokenReg.ASSIGNMENT) {
    _state = MACHINE_STATE.ASSIGNMENT;
  } else if (ch === tokenReg.GT) {
    _state = MACHINE_STATE.GT;
  } else if (ch === tokenReg.PLUS) {
    _state = MACHINE_STATE.PLUS;
  } else if (ch === tokenReg.MINUS) {
    _state = MACHINE_STATE.MINUS;
  } else if (ch === tokenReg.SLASH) {
    _state = MACHINE_STATE.SLASH;
  } else if (ch === tokenReg.STAR) {
    _state = MACHINE_STATE.STAR;
  } else if (ch === tokenReg.SEMI) {
    _state = MACHINE_STATE.SEMI;
  } else if (ch === tokenReg.LEFT_PAREN) {
    _state = MACHINE_STATE.LEFT_PAREN;
  } else if (ch === tokenReg.RIGHT_PAREN) {
    _state = MACHINE_STATE.RIGHT_PAREN;
  } else {
    _state = MACHINE_STATE.INITIAL;
  }
  if (token.type === MACHINE_STATE.ID && token.text === 'const') {
    token.type = MACHINE_STATE.CONST;
  }
  if (token.text.trim() !== '') {
    tokenList.push({
      ...token,
    });
  }
  token.type = _state;
  token.text = ch;
  return _state;
};

// 初始化词法分析器
const initLexer = () => {
  tokenList = [];
  state = MACHINE_STATE.INITIAL;
  token = {
    text: '',
    type: state,
  };
};

/**
 * 有限状态机
 * @param {string} sentence 当前语句
 */
export const lexer = (sentence: string) => {
  initLexer();
  const len = sentence.length;
  for(let i = 0; i < len; i++) {
    const ch = sentence[i];
    switch (state) {
      case MACHINE_STATE.PLUS:
        state = initToken(ch);
        break;
      case MACHINE_STATE.MINUS:
        state = initToken(ch);
        break;
      case MACHINE_STATE.STAR:
        state = initToken(ch);
        break;
      case MACHINE_STATE.SLASH:
        state = initToken(ch);
        break;
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
        if (ch === tokenReg.ASSIGNMENT) {
          token.type = MACHINE_STATE.GE;
          state = MACHINE_STATE.GE;
          token.text += ch;
        } else {
          state = initToken(ch);
        }
        break;
      case MACHINE_STATE.ASSIGNMENT:
        state = initToken(ch);
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
      case MACHINE_STATE.SEMI:
        state = initToken(ch);
        break;
      case MACHINE_STATE.LEFT_PAREN:
        state = initToken(ch);
        break;
      case MACHINE_STATE.RIGHT_PAREN:
        state = initToken(ch);
        break;
      default:
        break;
    }
  }
  tokenList.push(token);
  return tokenList;
};
