$(document).ready(function(){
	var names = ['Captain Phasma', 'Finn', 'Kylo Ren', 'Poe Dameron', 'Trooper', 'Unknown'];
	var characters = [];
	var ally = {};
	var defender = {};
	var times = 1;
	names.forEach(function(names, i){
		//					Math.floor(Math.random() * (max - min + 1)) + min;
		var health = Math.floor(Math.random() * (120 - 75 + 1)) + 75;
		var attack = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
		var counter = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
		
		var character = {
			name: names,
			img: 'assets/images/' + names + '.jpg',
			healthPoints: health,
			attackPower : attack,
			counterAttackPower : counter,
			increaseAttackPower: function(times) {
				this.attackPower = this.attackPower + times;
			},
			decreaseHealthPoints: function(points) {
				this.healthPoints -=points;
			},
		}
		characters.push(character);
	});

	console.log('showing ' + characters.length);
	characters.forEach(function(character, i){
		var article = 
		$("<article class='col-xs-2 thumbnail character'><h6 class='text-center name'>" + character.name + "</h6><img class='img-responsive center-block' src='" + character.img + "' width='125' height='125'><h6 class='text-center health'>"+ character.healthPoints + "</h6></article>"
		);
		article.attr("data-let", character.name);
		// article.data('let', character.name);
		$('.characters').append(article);
		console.log(character);
	});
	$('#attack').hide();
	$('#restart').hide();

	$('.character').on('click', function() {
		// Check if ally exist
		// if (!$('.ally').length) {
		// 	console.log('adding ally');
		// 	$(this).addClass('ally');
		// 	$('.ally-section').append(this);
		// } else {
		// 	$('.characters > article').each(function() {
		// 		$(this).addClass('enemy');
		// 		// $('article').removeClass('character');
		// 		$('.enemies-section').append(this);
		// 	});
		// };

		$(this).addClass('ally');
		$('.ally-section').append(this);
		//	Otherwise keeps adding to .ally-section
		$('.character').off('click');
		$('.characters > article').each(function() {
			$(this).addClass('enemy');
			// $('article').removeClass('character');
			$('.enemies-section').append(this);
		});
		$('.enemies-section').css('clear', 'both');							// ??
	});
	// $('.enemy').on('click', function() {										// Why this does not work ??
	$('.enemies-section').on('click', '.enemy', function() {	// Why ??
		$('#message').html('');
		$('.defender-section').append(this);
		$(this).removeClass('enemy');
		$(this).css('background-color', 'red');
		$(this).addClass('defender');
		$('.defender-section').css('clear', 'both');
		$('#attack').show();

		// $('.ally').each(function() {
		// 	console.log('data-let: ' + $(this).data('let'));
		// })
		if ($('.defender').length) {
			$('.enemy').hide();
		} else {
			$('enemy').show();
		};
		var allyDataLet = $('.ally').data('let');
		var defenderDataLet = $('.defender').data('let');

		characters.forEach(function(character, i){
			if (allyDataLet === character.name) {
				ally = character;
				// console.log(ally);
			} else if (defenderDataLet === character.name) {
				defender = character;
				// console.log(defender);
			}
		});

	});

	$('#attack').on('click', function() {
		if ($('.defender').length) {
			$('.ally').remove();
			$('.defender').remove();
			ally.increaseAttackPower(12);
			defender.decreaseHealthPoints(ally.attackPower);
			$('#laser').css('src', 'assets/sounds/LaserBlast.mp3');
			$('#laser')[0].play();

			// console.log(ally.healthPoints);
			console.log(defender.healthPoints);
			var span = '';
			var defenderElem = 
			$("<article class='col-xs-2 thumbnail character defender'><h6 class='text-center name'>" + defender.name + "</h6><img class='img-responsive center-block' src='" + defender.img + "' width='100' height='100'><h6 class='text-center health'>" + defender.healthPoints + "</h6></article>"
			);

			if (defender.healthPoints < 0) {
				$('.defender').remove();
				$('.enemy').show();
				console.log('show me ');
				span = 'You have defated ' + defender.name + ', you can choose to fight another enemy '
			} else {
				$('.defender-section').append(defenderElem);
				ally.decreaseHealthPoints(defender.counterAttackPower);
				span += 'You attack ' + defender.name + ' for ' + ally.attackPower + ' damage';
				span +='<br>' + defender.name + ' attack you back for ' + defender.counterAttackPower + ' damage';

			}

			if (ally.healthPoints < 0) {
				span = 'You been defeaded - Game Over ..!!!'
				$('#attack').off('click');
				$('#restart').show();
			};
			
			// ally.increaseAttackPower(times);
			
			var allyElem = 
			$("<article class='col-xs-2 thumbnail character ally'><h6 class='text-center name'>" + ally.name + "</h6><img class='img-responsive center-block' src='" + ally.img + "' width='100' height='100'><h6 class='text-center health'>"+ ally.healthPoints+ "</h6></article>"
			);
			$('.ally-section').append(allyElem);

			
			if (!$('.enemy').length) {
				span = 'You Win .....!!';
				$('h4').hide();
				$('#attack').off('click');
				$('#attack').hide();
				$('#restart').show();
				$("img").animate({
					width : "1250",
					height: "350",
				}, 5000);
			}
			times ++;


		} else {
			span = 'No enemy to fight ...!';
		}

		$('#message').html(span);
	});

	$('#restart').on('click', function() {
		location.reload();
	})

});
