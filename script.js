function levenshtein(a, b) {
	var dp = Array(a.length + 1);
	for(var i = 0; i <= a.length; i++) {
		dp[i] = Array.apply(null, Array(b.length + 1))
			.map(Number.prototype.valueOf, 0);
	}

	for(var i = 0; i <= a.length; i++) {
		dp[i][0] = i;
	}
	for(var j = 0; j <= b.length; j++) {
		dp[0][j] = j;
	}
	for(var i = 1; i <= a.length; i++) {
		for(var j = 1; j <= b.length; j++) {
			dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + 1;
			if(a[i-1] == b[j-1]) {
				dp[i][j] = Math.min(dp[i][j], dp[i-1][j-1]);
			} else {
				dp[i][j] = Math.min(dp[i][j], dp[i-1][j-1] + 1);
			}
		}
	}

	return [dp[a.length][b.length], dp];
}

function capitalizeName(a) {
	a = a.toLowerCase();
	return String.fromCharCode(
		a.charCodeAt(0) & (~0x20)) +
		a.substr(1);
}

function getResults() {
	/* called when the button is pushed */
	var name1 = $('#name1').val().toUpperCase();
	var name2 = $('#name2').val().toUpperCase();
	console.log('names: ' + name1 + ', ' + name2);

	var selection = $('input[name="namelist"]:checked').val();
	console.log('namelist: ' + selection);

	var names = null;
	if(selection === "male") {
		names = boynames;
	} else if(selection === "female") {
		names = girlnames;
	} else {
		names = bothnames;
	}

	console.log('number of names: ' + names.length);

	var sc1 = {};
	var sc2 = {};
	var tsc = {};

	var top10 = Array(10);

	names.forEach(function(name) {
		sc1[name] = levenshtein(name, name1)[0];
		sc2[name] = levenshtein(name, name2)[0];

		tsc[name] = Math.pow(sc1[name], 4) + Math.pow(sc2[name], 4);

		insert(top10, name, tsc[name]);
	});

	console.log('results: ' + top10);

	for(var i = 1; i <= 10; i++) {
		$('#res' + i).html(top10[i-1][0]);
		$('#sc' + i + '1').html(sc1[top10[i-1][0]]);
		$('#sc' + i + '2').html(sc2[top10[i-1][0]]);
	}
	$('#results').removeAttr('hidden');
}

/* inserts a value into the list of the 10 best scores */
function insert(arr, str, val) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] === undefined || val < arr[i][1]) {
			var tmp = arr[i];
			arr[i] = [str, val];
			if(tmp === undefined) {
				return;
			}
			str = tmp[0];
			val = tmp[1];
		}
	}
}

/* for testing in node */
exports.capitalizeName = capitalizeName;
exports.levenshtein = levenshtein;
