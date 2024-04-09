const { io } = require('../index');



io.on('connection', client => {
  console.log('client conected');
  
  client.on('disconnect', () => {
       console.log('client desconected')

      });
  });