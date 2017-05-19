from flask import Flask
from flask import jsonify
from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper

from code.test.playground.chapter08_10 import Chapter08_10

app = Flask(__name__)

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, str):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, str):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

@app.route('/')
def hello_world():
        return 'Hello, Flask!'
    
    
@app.route('/ph')
def ph_stream():
        return 'Progressive histogram stream'
    

@app.route('/test/post', methods=["POST"])
def test_post():
        return 'Progressive histogram stream'


@app.route('/test/get', methods=["GET"])
def test_get():
        return 'Test: Get!'
    

@app.route('/test/json', methods=["GET"])
def test_json_get():
    d = {"arr":[1,2,3,4], "name":"halil", "surname":"agin", "hash":{"a":1, "b":"string"}}
    return jsonify(d)


#http://flask.pocoo.org/snippets/56/
@app.route('/test/ch8_10', methods=["GET"])
@crossdomain(origin="*")
def test_ch8_10():
    ch8_10 = Chapter08_10()
    mu, zs = ch8_10.produceData();
    return jsonify({"mu":mu.tolist(), "zs":zs.tolist()})
    pass
