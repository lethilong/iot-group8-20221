import argparse
from simulator import Simulator

parser = argparse.ArgumentParser()
parser.add_argument('-f', '--file', dest='settings_file', help='settings file', default='settings.json')
args = parser.parse_args()

simulator = Simulator(args.settings_file)
simulator.run()
