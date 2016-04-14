from flask import Flask, render_template, request, json, jsonify

from satnogsclient import settings as client_settings
from satnogsclient.scheduler import tasks
from satnogsclient.observer.udpsocket import Udpsocket
from satnogsclient.observer.commsocket import Commsocket
import logging
from flask.json import JSONDecoder

logger = logging.getLogger('satnogsclient')
app = Flask(__name__)


@app.route('/update_status', methods=['GET', 'POST'])
def get_status_info():
    json_data = {}
    json_data['azimuth'] = 'NA'
    json_data['altitude'] = 'NA'
    json_data['frequency'] = 'NA'
    sock1 = Commsocket('127.0.0.1',5005)

    b = sock1.connect()
    if b:
        data = sock1.send("Requesting update on satnogs-client variables\n")
        json_data = json.loads(data)
    else:
        print 'No observation currently'

    return jsonify(json_data);


@app.route('/')
def status():
    '''View status satnogs-client.'''
    return render_template('status.j2')


@app.route('/control/')
def control():
    '''Control satnogs-client.'''
    sock = Commsocket('127.0.0.1',5011)
    b = sock.connect()
    if b:
        print sock.send("Hello there\n")
    else:
        print 'Task feeder thread not online'

    return render_template('control.j2')


@app.route('/configuration/')
def configuration():
    '''View list of satnogs-client settings.'''
    filters = [
        lambda x: not x.startswith('_'),
        lambda x: x.isupper()
    ]

    entries = client_settings.__dict__.items()
    settings = filter(lambda (x, y): all(f(x) for f in filters), entries)

    ctx = {
        'settings': sorted(settings, key=lambda x: x[0])
    }

    return render_template('configuration.j2', **ctx)
