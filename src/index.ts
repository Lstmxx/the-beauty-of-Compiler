import { lexer } from './实现一门脚本语言 · 原理篇/simple-lexer/index';

// 测试
const sentence = 'const age3 = 45 + 12';
const tokenList = lexer(sentence);
console.log(tokenList);
