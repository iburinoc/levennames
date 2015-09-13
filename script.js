function levenshtein(a, b) {
	var dp = Array(a.length + 1);
	for(var i = 0; i <= a.length; i++) {
		dp[i] = Array.apply(null, Array(b.length + 1))
			.map(Number.prototype.valueOf, 0);
	}

	for(var i = 1; i <= a.length; i++) {
		for(var j = 1; j <= b.length; j++) {
			dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + 1;
			if(a[i-1] == b[i-1]) {
				dp[i][j] = Math.min(dp[i][j], dp[i-1][j-1]);
			} else {
				dp[i][j] = Math.min(dp[i][j], dp[i-1][j-1] + 1);
			}
		}
	}

	return [dp[a.length][b.length], dp];
}

exports.levenshtein = levenshtein;
