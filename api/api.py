import flask
from flask import request, jsonify
from bandwidths import BANDWIDTHS
import time
ts = time.time()

app = flask.Flask(__name__)

@app.route('/api/v1/resources/bandwidths/agg', methods=['GET'])
def bandwidth_agg():
    # Check if all required parameters are provided
    if 'device_id' in request.args:
        device_id = request.args['device_id']
        
        if 'end_time' in request.args:
            end_time = int(request.args['end_time'])
        else:
            end_time = time.time()

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