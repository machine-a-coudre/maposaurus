import { writeFileSync } from 'fs';

const filePath = './node_modules/@camptocamp/ogc-client/dist/wmts/ol-tilegrid.js';
const content = `
  export {}; // Empty export causing build failure
`;

writeFileSync(filePath, content);