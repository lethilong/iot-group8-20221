import time
import json
import calendar
import random
import threading
from abc import ABC, abstractmethod
import paho.mqtt.client as mqtt

class Topic(ABC):
    def __init__(self, broker_url, broker_port, topic_device, topic_data):
        self.broker_url = broker_url
        self.broker_port = broker_port
        self.topic_device = topic_device
        self.topic_data = topic_data
        self.client = None

    def connect(self):
        self.client = mqtt.Client(self.topic_device, clean_session=True, transport='tcp')
        self.client.on_publish = self.on_publish
        self.client.connect(self.broker_url, self.broker_port) 
        self.client.loop_start()

    @abstractmethod
    def run(self):
        pass

    def disconnect(self):
        self.client.loop_end()
        self.client.disconnect()

    def on_publish(self, client, userdata, result):
        print(f'[{time.strftime("%H:%M:%S")}] Data published on: {self.topic_device}')


class TopicAuto(Topic, threading.Thread):
    def __init__(self, broker_url, broker_port, topic_device, topic_data, time_interval):
        Topic.__init__(self, broker_url, broker_port, topic_device, topic_data)
        threading.Thread.__init__(self, args = (), kwargs = None)
        self.time_interval = time_interval

    def run(self):
        self.connect()
        while True:
            payload = self.generate_data()
            self.client.publish(topic='iot/group8/data', payload=json.dumps(payload), qos=2, retain= False) 
            time.sleep(self.time_interval)

    def generate_data(self):
        payload = {}
        
        current_GMT = time.gmtime()
        ts = calendar.timegm(current_GMT)
        str = random.choice(self.topic_data)
        payload['message'] = str.split(': ')[1]
        payload['type'] = str.split(': ')[0]
        payload['createdAt'] = ts
        payload['deviceId'] = self.topic_device
        
        return payload
