import { lexer } from './实现一门脚本语言 · 原理篇/simple-lexer/index';
import { parse } from './实现一门脚本语言 · 原理篇/simple-parse/index';

// 测试
const sentence = 'const age3 = 45 + 12 * 3;';
const tokenList = lexer(sentence);
console.log(tokenList);

parse(tokenList);