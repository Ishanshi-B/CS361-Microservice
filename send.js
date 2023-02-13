
    const amqp = require("amqplib/callback_api");

    amqp.connect("amqp://localhost", function(error0, connection) {
      if (error0) {
        throw error0;
      }
    
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
    
        var queue = "quote_request";
    
        channel.assertQueue(queue, {
          durable: false
        });
    
        channel.sendToQueue(queue, Buffer.from("Get Quote"));
    
        console.log(" [x] Sent 'Get Quote'");
      });
    
      setTimeout(function() {
        connection.close();
        process.exit(0);
      }, 500);
    });