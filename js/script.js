let formData = {
	name: null,
	birth: null,
	email: null,
	im: null,
	contact: null,
	address: null,
	contactAddress: null,
	keyFingerprint: null,
	keyServer: null
};

function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		function toSolidBytes(match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
}

document.addEventListener("DOMContentLoaded", function(event) {

	$('input, textarea').on('change', function () {
		formData[this.name] = $(this).val();
		$('#qrcode').html('').qrcode(b64EncodeUnicode(JSON.stringify(formData)));
	});

	$('button').click(function() {
		window.print();
	})
});