import json
from topic import TopicAuto

class Simulator:
    def __init__(self, settings_file):
        self.broker_url = None
        self.broker_port = None
        self.topics = []
        self.load_settings(settings_file)

    def load_settings(self, settings_file):
        with open(settings_file) as json_file:
            config = json.load(json_file)
            self.broker_url = config['BROKER_URL']
            self.broker_port = config['BROKER_PORT']
            for topic in config['TOPICS']:
                topic_data = topic['MESSSAGE']
                topic_time_interval = topic['TIME_INTERVAL']
                
                topic_device = topic['DEVICE_ID']
                self.topics.append(TopicAuto(self.broker_url, self.broker_port, topic_device, topic_data, topic_time_interval))


    def run(self):
        for topic in self.topics:
            print(f'Starting: {topic.topic_device} ...')
            topic.start() 

