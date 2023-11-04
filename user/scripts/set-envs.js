require('dotenv').config();
const { mkdirSync, writeFileSync } = require('fs');

const targetPath = './src/environments/environments.ts';

const envFileContent = `
export const environtment = {
  apiUrl: "${ process.env['API_URL']}",
  mapboxToken: "${ process.env['MAPBOX_TOKEN']}",
}
`;

mkdirSync('./src/environments/', { recursive: true });

writeFileSync( targetPath, envFileContent );
