#!/usr/bin/env python
import json
import pika
import sys
import urllib
import urllib2

connection = pika.BlockingConnection(pika.ConnectionParameters(
        host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='topic_logs',
                         type='topic')

result = channel.queue_declare(exclusive=True)
queue_name = result.method.queue

agent_id = sys.argv[1]

# binding_keys = sys.argv[1:]
# if not binding_keys:
#     print >> sys.stderr, "Usage: %s [binding_key]..." % (sys.argv[0],)
#     sys.exit(1)

# get the binding keys for the agent through a rest call
url = 'http://localhost:3000/subscriptions/' + agent_id
response = urllib2.urlopen(url)
data = json.load(response)
binding_keys = [sub['routingKey'] for sub in data]

print binding_keys

for binding_key in binding_keys:
    channel.queue_bind(exchange='topic_logs',
                       queue=queue_name,
                       routing_key=binding_key)

print ' [*] Waiting for logs. To exit press CTRL+C'

def send_notification(routing_key, body):
    # url = 'http://localhost:3000/subscriptions/notify'
    # data = {'data': body, 'routingKey': routing_key}
    # post_data =  urllib.urlencode(data)
    # req = urllib2.Request(url, post_data)
    # urllib2.urlopen(req)
    print 'sent notification to ' + agent_id

def callback(ch, method, properties, body):
    send_notification(method.routing_key, body)
    print " [x] %r:%r" % (method.routing_key, body)

channel.basic_consume(callback,
                      queue=queue_name,
                      no_ack=True)

channel.start_consuming()
