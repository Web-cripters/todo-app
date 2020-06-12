const {todoApi} = require('./backend/config');

todoApi.listen(todoApi.get('port'),()=>{
  console.log(`Server Started Running at ${todoApi.get('port')}`);
});
