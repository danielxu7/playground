var arr = [];
$('.rlg-trade-display-container .rlg-trade-actions p a:nth-child(2)').each(function (index, element) {
	arr.push(element.href);
});
var recursion = function (index) {
	if (index === arr.length) {
		return;
	}
	var myWindow = window.open(arr[index]);
	function myLoad() {
		try {
			myWindow.document.querySelector('.rlg-btn-trade-form.rlg-btn-primary').click();
			setTimeout(function () {
				myWindow.close();
				// recursively call the next trade
				setTimeout(function () {
					recursion(index+1);
				}, 8000);
			}, 8000);
		}
		catch {
			myWindow.close();
			recursion(index+1)
		}
	}
	myWindow.addEventListener('load', myLoad, false);
}
var initiate = function () {
	recursion(0);
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes();
	console.log('Finished updating trades at ' + time);
};
initiate();
setInterval(() => {
	initiate();
}, 1000*60*60);
