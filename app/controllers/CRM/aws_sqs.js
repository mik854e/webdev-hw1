// Load the SDK
var AWS = require('aws-sdk'),
    awsCredentialsPath = './aws_cred.json',
    sqsQueueUrl = 'https://sqs.us-east-1.amazonaws.com/009548403898/MyQueue',
    sqs;
// Load Aws Credentials
AWS.config.loadFromPath(awsCredentialsPath);

// Create a SQS client
sqs = new AWS.SQS().client;

var receiveFromQueue = function (){
  sqs.receiveMessage({
   QueueUrl: sqsQueueUrl,
   MaxNumberOfMessages: 1, // how many messages do we wanna retrieve?
   VisibilityTimeout: 60, // seconds - how long we want a lock on this job
   WaitTimeSeconds: 3 // seconds - how long should we wait for a message?
 }, function(err, data) {
   // If there are any messages to get
   if (data.Messages) {
      // Get the first message (should be the only one since we said to only get one above)
      var message = data.Messages[0],
          body = JSON.parse(message.Body);
      // Now this is where you'd do something with this message
      doSomethingCool(body, message);  // whatever you wanna do
      // Clean up after yourself... delete this message from the queue, so it's not executed again
      removeFromQueue(message);  // We'll do this in a second
   }
 });
};

var removeFromQueue = function(message) {
   sqs.deleteMessage({
      QueueUrl: sqsQueueUrl,
      ReceiptHandle: message.ReceiptHandle
   }, function(err, data) {
      // If we errored, tell us that we did
      err && console.log(err);
   });
};


/* SAMPLE
outbound = {
  MessageBody : JSON.stringify({ 
    data: "Test Message", 
    timestamp: new Date().getTime()
    })  
}
*/
var sendMessage = function(message){
    var params = {
        MessageBody: message, 
        QueueUrl: sqsQueueUrl, 
        DelaySeconds: 0
      };
    sqs.sendMessage(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });)
}; 

