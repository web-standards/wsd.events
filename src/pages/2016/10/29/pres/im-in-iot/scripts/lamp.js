const LAMP_NAME = 'Bulb';
const LAMP_PRIMARY = 0xFF08;
const LAMP_BATTERY = 0x180F;
const LAMP_COLOR = 0xFFFC;
const LAMP_EFFECT = 0xFFFB;
const LAMP_LEVEL = 0x2A19;

const LAMP_ACTION = [
	0x00, // ?
	0xFF, // Red
	0xFF, // Green
	0xFF, // Blue
	0x03, // Type
	0x00, // ?
	0x06, 0x06 // Speed
];

// Types:
// 0. Blinking Color
// 1. Fading Color
// 2. Blining Rainbow
// 3. Fading Rainbow

const lamp = () => {
	let _device = null;
	let _server = null;
	let _connected = false;

	function _getDevice() {
		return navigator.bluetooth.requestDevice({
			filters: [
				{ name: LAMP_NAME }
			],
			optionalServices: [
				LAMP_PRIMARY,
				LAMP_BATTERY
			]
		}).then(device => {
			_device = device;
		}).catch(error => {
			console.log(error);
		});
	}

	function _getServer() {
		return _device.gatt.connect().then(server => {
			_server = server;
		}).catch(error => {
			console.log(error);
		});
	}

	function _getService(serviceID) {
		return _server.getPrimaryService(serviceID).then(service => {
			return service;
		}).catch(error => {
			console.log(error);
		});
	}

	function _getCharacteristic(serviceID, characteristicID) {
		return _getService(serviceID).then(service => {
			return service.getCharacteristic(characteristicID);
		}).then(characteristic => {
			return characteristic;
		}).catch(error => {
			console.log(error);
		});
	}

	function _connect() {
		return new Promise((resolve, reject) => {
			if (_connected) {
				return resolve();
			}

			return _getDevice().then(() => {
				return _getServer();
			}).then(() => {
				_connected = true;
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	function _write(serviceID, characteristicID, data) {
		return _getCharacteristic(serviceID, characteristicID).then(characteristic => {
			return characteristic.writeValue(data);
		});
	}

	function _read(serviceID, characteristicID) {
		return _getCharacteristic(serviceID, characteristicID).then(characteristic => {
			return characteristic.readValue();
		});
	}

	function _hexToRgb(hex) {
		let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? [
			parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16)
		] : null;
	}

	return {
		connect: () => {
			return _connect();
		},
		paint: (color) => {
			return _connect().then(() => {
				let rgb = _hexToRgb(color);
				let array = new Uint8Array([0].concat(rgb));
				return _write(LAMP_PRIMARY, LAMP_COLOR, array);
			});
		},
		effect: () => {
			return _connect().then(() => {
				let array = new Uint8Array(LAMP_ACTION);
				return _write(LAMP_PRIMARY, LAMP_EFFECT, array)
			});
		}
	}
}
