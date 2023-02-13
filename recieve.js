const amqp = require("amqplib/callback_api");
const axios = require("axios");

amqp.connect("amqp://localhost", function(error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var qu = "quote_request";

    channel.assertQueue(qu, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", qu);

    channel.consume(qu, function(msg) {
      var msgContent = msg.content.toString();
      if (msgContent === "Get Quote") {
        console.log(" [x] Received 'Get Quote'");

        axios
          .get("https://api.quotable.io/random")
          .then(function(response) {
            var quote = response.data.content;
            var author = response.data.author;
            console.log(quote + " - " + author);

            channel.assertQueue("quote_response", {
              durable: false
            });

            channel.sendToQueue("quote_response", Buffer.from(quote + " - " + author));
            console.log(" [x] Sent quote");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }, {
      noAck: true
    });
  });
});
