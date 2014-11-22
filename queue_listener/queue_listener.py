import boto.sqs
import time
import urllib
import urllib2


HOST = "http://localhost:3000"
MESSAGE_TO_URL = {"createCustomer": HOST + "/createCustomer",
				  "createAgent": HOST + "/createAgent",
				  "updateCustomer": HOST + "/updateCustomer",
				  "updateAgent": HOST + "/updateAgent",
				  "deleteCustomer": HOST + "/deleteCustomer",
				  "deleteAgent": HOST + "/deleteAgent"
				  }

# load keys from a file

conn = boto.sqs.connect_to_region("us-east-1",
                                  aws_access_key_id='AKIAJHHMPPTOXDP7VWSA',
                                  aws_secret_access_key='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')
	
my_queue = conn.get_queue('MyQueue')

while True:
    messages = my_queue.get_messages(message_attributes='*')
    for message in messages:
    	data = {}
    	for attribute in message.message_attributes:
    		data[attribute] = message.message_attributes[attribute]['string_value']
    	print message.get_body()
        url = MESSAGE_TO_URL[message.get_body()]
        print url
        post_data = urllib.urlencode(data)
        req = urllib2.Request(url, post_data)
        urllib2.urlopen(req)
    time.sleep(5) 
