from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import base64
import numpy as np
from gesture_recognition import GestureRecognition
app = Flask(__name__)
CORS(app)

class GestureRecognizer:
    def __init__(self):
        self.gesture_detector = GestureRecognition(
            keypoint_classifier_label='C:/Users/ACER/Desktop/BTL-LTN/Server_AI/keypoint_classifier_label.csv',
            keypoint_classifier_model='C:/Users/ACER/Desktop/BTL-LTN/Server_AI/keypoint_classifier.tflite'
        )

    def recognize_gesture(self, image_data):
        # Convert base64 image data to OpenCV image format
        nparr = np.fromstring(base64.b64decode(image_data.split(',')[1]), np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Perform gesture recognition on the frame
        debug_image, gesture = self.gesture_detector.recognize(frame)

        return debug_image, gesture

gesture_recognizer = GestureRecognizer()

@app.route('/recognize', methods=['POST'])
def recognize_gesture():
    image_data = request.json.get('image')
    debug_image, gesture = gesture_recognizer.recognize_gesture(image_data)

    return jsonify({'gesture': gesture})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
