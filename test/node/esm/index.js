if ('Bun' in globalThis) {
  throw new Error('❌ Use Node.js to run this test!');
}

import { yoga } from '@elysiajs/graphql-yoga';

if (typeof yoga !== 'function') {
  throw new Error('❌ ESM Node.js failed');
}

console.log('✅ ESM Node.js works!');
