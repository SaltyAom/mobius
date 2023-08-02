if ('Bun' in globalThis) {
  throw new Error('❌ Use Node.js to run this test!');
}

const { yoga } = require('@elysiajs/graphql-yoga');

if (typeof yoga !== 'function') {
  throw new Error('❌ CommonJS Node.js failed');
}

console.log('✅ CommonJS Node.js works!');
