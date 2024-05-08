const { verifyJWT } = require('../helpers/jwt');
const { io } = require('../index');




io.on('connection', async (client) => {

  console.log('client conected');
  console.log(client.handshake.headers['x-token'])

  const [valid, uid] = verifyJWT(client.handshake.headers['x-token']);
  const { userConnected, userDisconected } = require('../controller/socket');
  //verify conection 
  if (!valid) {
    console.log('client invalid');
    console.log(client.handshake.headers['x-token']);
    return client.disconnect();
  }
  //client conected
  await userConnected(uid);
  console.log('client authenticated');
  console.log(valid, uid);
  // user in to a room 
  //global romm all diveces conected

  //join a person to a room:
  client.join(uid);

  client.on('personal-message',
    (payload) => {
      console.log(payload);
      io.to(payload.to).emit('personal-message', payload);
    });

    

  //send event to a specific user 

  //client.to(ui).emit('event')

  client.on('disconnect', async () => {
    await userDisconected(uid);
    console.log('client desconected')

  });
});