import init_Display from './JS/init_Display.js';
import Graph_Render from './JS/Graph_Render.js';

//set up cache for offline use
if ('serviceWorker' in navigator) {
	console.log('service available');
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('./sw_pages_cache.js')
			.then((registration) => console.info('🌞 Service worker registration succeeded:', registration))
			.catch((err) => console.error('Service worker registration failed:', err));
	});
} else {
	console.log('Service workers are not supported.....😞');
}

$(document).ready(function() {
	//fetch all card data
	init_Display();

	//toggle active css
	$('.navbar-nav .nav-link').click(function(e) {
		//validate 5 coins were selected and target is modlaLink
		if ($('#tracked_content [data-switch-id]:checked').length < 5 && $(e.target).attr('id') === 'modalLink') {
			return;
		} else {
			$('.navbar-nav .nav-link').removeClass('active');
			$(this).addClass('active');
		}
	});

	/*fix css for hamburger menu/exchange info
     */
	$(window).resize(function() {
		if ($(window).width() > 990) {
			$('.nav-link,.searchbar').removeClass('nav-item-small bg-dark').css('margin:0;');
		}
	});

	$('.navbar-toggler-icon').click(function() {
		if ($(window).width() < 990) {
			$('.nav-link,.searchbar').addClass('nav-item-small bg-dark');
		}
	});
	/*
     *fix css for hamburger menu -end*/

	//search bar functionality
	$('.searchButton').on('click', (e) => filterSearch());
	$('.searchInput').on('click touchend mouseup mousedown keypress  paste keyup change blur', (e) => filterSearch());

	//show tracked/checked cards
	$('#tracked_coins').click(function() {
		if (this.checked) {
			const tracked = $('[data-switch-track]:checked');
			if (tracked.length) {
				$('.card-container').hide();
				tracked.closest('.card-container').show();
			}
		} else {
			$('.card-container').show();
		}
	});

	//live reports click on navbar opens modal if has 5
	$('#modalLink').click((e) => {
		if ($('[data-switch-track]:checked').length < 5) {
			alert('please select 5 coins to track');
		} else {
			$('#reportsLink').show();
			$('#trackedCoinsModal').modal('show');
		}
	});

	//go to live reports
	$('#reportsLink').click((e) => {
		//validate 5 coins were selected
		if ($('#tracked_content [data-switch-id]:checked').length < 5) {
			return alert('please select 5 coins to track');
		}

		//store coin id's for cryptocompare api call
		let coinList = $.map($('#tracked_content [data-switch-id]:checked'), (element, index) =>
			$(element).attr('data-switch-id'),
		);
		//store currency for cryptocompare api call
		let currency = [ 'USD', 'EUR', 'ILS' ];

		//destroy previous instances
		$('#trackedGraphs').children().remove();

		//render Graph Element
		$.each(currency, function(index, coinName) {
			let Graphelement = new Graph_Render(`Graph${coinName}`, coinName, coinList);
			$('#trackedGraphs').append($(Graphelement.renderGraphContainer()));
			Graphelement.dataObjBuilder();
			Graphelement.updateData();
		});

		//go to reports
		$('#cardContainer').addClass('hide-this');
		$('#trackedCoinsModal').modal('hide');

		$('.nav-link').each(function(index, element) {
			$(element).removeClass('active');
		});

		$('#trackedGraphs').removeClass('hide-this');
	});

	//go to about page
	$('#aboutMeShow').click((e) => {
		$('#cardContainer,#trackedGraphs').addClass('hide-this');
		$('#aboutMe').removeClass('hide-this');
	});

	//show main container on modal dismiss
	$('#trackedCoinsModal [data-dismiss]').click((e) => {
		$('#cardContainer').removeClass('hide-this');
	});

	$('#cardContainerShow').click((e) => {
		$('#cardContainer').removeClass('hide-this');
	});
});

function filterSearch() {
	if ($('.searchInput').val().length >= 3) {
		var value = $('.searchInput').val().toLowerCase();
		$('[data-search-target]').filter(function() {
			$(this).toggle($(this).attr('data-search-target').toLowerCase().toLowerCase().indexOf(value) > -1);
		});
		return;
	}
	$('[data-search-target]').show();
}
