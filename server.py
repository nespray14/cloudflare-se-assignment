from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def show_headers(path):
    headers_dict = dict(request.headers)
    return jsonify({
        "message": "Here are your HTTP Request Headers",
        "headers": headers_dict
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=443, ssl_context=('/etc/letsencrypt/live/nespray14.org/fullchain.pem', '/etc/letsencrypt/live/nespray14.org/privkey.pem'))
