from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import paho.mqtt.client as mqtt

app = Flask(__name__)
CORS(app)

# Thiết lập client MQTT
mqtt_client = mqtt.Client()

# Kết nối tới broker MQTT
mqtt_client.connect("mqtt-dashboard.com", 1883)

# Bắt đầu vòng lặp trong một luồng riêng
mqtt_client.loop_start()

@app.route('/gesture-control', methods=['POST'])
def gesture_control():
    try:
        image_data = request.json.get('image')
        if image_data is None:
            return jsonify({'Error': 'Không có dữ liệu hình ảnh'}), 400
        
        response = requests.post("http://127.0.0.1:5001/recognize", json={"image": image_data})

        if response.status_code == 200:
            data = response.json()
            gesture = data.get('gesture')
            if gesture and gesture != "NONE":
                mqtt_client.publish("hand gesture", gesture)
            return jsonify(data)
        else:
            return jsonify({'Error': 'Lỗi máy chủ nhận diện cử chỉ'}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({'Error': str(e)}), 500

@app.route('/button-control', methods=['POST'])
def button_control():
    button_data = request.json.get('button')
    if button_data is not None:
        mqtt_client.publish("hand gesture", button_data)
        return jsonify(button_data)
    return jsonify({'Error': 'Không có dữ liệu nút bấm'}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
