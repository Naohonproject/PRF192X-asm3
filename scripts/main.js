/** @format */
$(function () {
	var testScore = {
		name: "",
		math: 0,
		physical: 0,
		chemistry: 0,
	};

	var keys = Object.keys(testScore);
	var inputs = [];

	$(".input-field input").blur(function () {
		if (!$(this).val()) {
			$(this).addClass("warning");
			alert("Please type in again,this input need to be fill in");
		} else {
			$(this).removeClass("warning");
		}
	});

	$("input").each(function (index, input) {
		inputs.push(input);
	});

	function assignUserScore() {
		keys.forEach(function (key, index) {
			testScore[key] = inputs[index].value;
			if (index > 0) {
				var store = Number.parseFloat(inputs[index].value).toFixed(1);
				testScore[key] = store;
			}
			inputs[index].value = "";
		});
	}

	function checkInput() {
		var testScoreEntries = Object.entries(testScore);
		var isFillInAllInputs = testScoreEntries.every(function (entry) {
			return entry[1] !== "";
		});
		var scoreObjects = testScoreEntries.slice(1);

		var isScore = scoreObjects.every(function (score) {
			return score[1] >= 1 && score[1] <= 10;
		});
		return isFillInAllInputs && isScore;
	}

	var scoreTable = $("#first-body");

	function displayScores() {
		if (checkInput()) {
			var rowContent =
				"<tr><td></td><td></td><td></td><td></td><td></td><td>?</td></tr>";
			scoreTable.append(rowContent);
			var lastRow = scoreTable[0].lastChild.cells;
			var stt = lastRow[0];
			stt.innerText = scoreTable[0].childElementCount;

			for (var i = 0; i < lastRow.length - 2; i++) {
				var key = keys[i];
				lastRow[i + 1].innerText = testScore[key];
			}
		} else {
			alert("scores must be numbers great than 0 and less than 10");
		}
	}

	$("#input-btn").on("click", function () {
		assignUserScore();
		displayScores();
	});

	var rows = scoreTable[0].children;

	$("#average-btn").on("click", function () {
		for (var i = 0; i < rows.length; i++) {
			var currentRow = rows[i];
			var average = rows[i].lastChild.innerText;
			var math = Number(currentRow.cells[2].innerText);
			var physical = Number(currentRow.cells[3].innerText);
			var chemical = Number(currentRow.cells[4].innerText);
			if (average === "?") {
				rows[i].lastChild.innerText = Number.parseFloat(
					(math + physical + chemical) / 3
				).toFixed(1);
			}
		}
	});

	$("#excel-btn").on("click", function () {
		for (var i = 0; i < rows.length; i++) {
			var currentRow = rows[i];
			var average = rows[i].lastChild.innerText;
			if (average === "?") {
				alert(
					"Please, you need to calculate average score first and then click this button"
				);
			} else {
				if (Number(average) > 8) {
					currentRow.classList.add("great");
				}
			}
		}
	});
});
