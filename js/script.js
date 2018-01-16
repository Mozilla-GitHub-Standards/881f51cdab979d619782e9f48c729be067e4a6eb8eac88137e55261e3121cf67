'use strict';

const QRC = qrcodegen.QrCode;

function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		function toSolidBytes(match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
}

function prepareQR(formInputs) {
    const formData = {};
    formInputs
        .forEach((input) => {
            formData[input.name] = input.value;
        });
    document.getElementById('qrcode').innerHTML =
        QRC.encodeText(
            b64EncodeUnicode(JSON.stringify(formData)),
            QRC.Ecc.MEDIUM
        ).toSvgString(4);
}

document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('#form input, #form textarea');
    formInputs.forEach((input) => input.addEventListener('change', prepareQR(formInputs)));

    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        prepareQR(formInputs);
        window.print();
    });
});
