const swaggerAutogen = require('swagger-autogen')();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API documentation for CSE 341 contacts application'
    },
    host: 'render.com',
    schemes: ['http']
  },
  // Path to the API docs
  apis: ['./src/routes/*.js'] // Replace with the path to your route files
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/students.js', './routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, swaggerOptions)
  .then(() => {
    console.log('Swagger documentation generated successfully');
  })
  .catch((error) => {
    console.error('Error generating Swagger documentation:', error);
  });
