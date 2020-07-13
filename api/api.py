import flask
from flask import request, jsonify
from bandwidths import BANDWIDTHS
from devices import DEVICES
import time
ts = time.time()

app = flask.Flask(__name__)

@app.route('/api/v1/resources/devices/list', methods=['GET'])
def bandwidth_list():
    results = []

    if 'device_id' in request.args:
        device_id = request.args['device_id']
        for n in DEVICES:
            if n['device_id'] == device_id:
                results.append(n)
    elif 'class' in request.args:
        device_class = request.args['class']
        for n in DEVICES:
            if n['class'] == device_class:
                results.append(n)
    elif 'type' in request.args:
        device_type = request.args['type']
        for n in DEVICES:
            if n['type'] == device_type:
                results.append(n)
    elif 'location' in request.args:
        device_location = request.args['location']
        for n in DEVICES:
            if n['location'] == device_location:
                results.append(n)
    elif 'model' in request.args:
        device_model = request.args['model']
        for n in DEVICES:
            if n['model'] == device_model:
                results.append(n)
    elif 'organization' in request.args:
        device_organization = request.args['organization']
        for n in DEVICES:
            if n['organization'] == device_organization:
                results.append(n)
    else:
        for n in DEVICES:
            results.append(n)

    return { "devices": results }


@app.route('/api/v1/resources/bandwidths/agg', methods=['GET'])
def bandwidth_agg():
    # Check if all required parameters are provided
    if 'device_id' in request.args:
        device_id = request.args['device_id']
        
        if 'end_time' in request.args:
            end_time = int(request.args['end_time'])
        else:
            end_time = 1524835983

        if 'window_time' in request.args:
            window_time = int(request.args['window_time'])
        else:
            window_time = 60

        if 'num_windows' in request.args:
            num_windows = int(request.args['num_windows'])
        else:
            num_windows = 10
    else:
        return "Error: Incorrect format. Missing required device_id."

    # Create an empty list for our results
    results = []
    
    #calculate start time and running variables
    start_time = end_time - (window_time * num_windows)
    running_start_time = start_time
    running_end_time = running_start_time + window_time

    # query the bandwidth data and return the results
    for i in range(num_windows):
        sum_bytes_ts = 0
        sum_bytes_fs = 0
        for n in BANDWIDTHS:
            # sum up fs and ts bytes in each window
            if n['device_id'] == device_id and n['timestamp'] >= running_start_time and n['timestamp'] <= running_end_time:
                sum_bytes_fs += n['bytes_fs']
                sum_bytes_ts += n['bytes_ts']
        #build response object
        results.append({ "timestamp": running_end_time, "data": [{ "bytes_fs": sum_bytes_fs, "bytes_ts": sum_bytes_ts}] })
        running_start_time = running_end_time
        running_end_time += window_time

    return { "bandwidths": results }

if __name__ == "__main__":
    app.run()