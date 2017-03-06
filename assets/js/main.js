(function ($) {
"use strict";

    // $( window ).load(function() {
    //   	var headerUserWidth = $('.header-nav-user .dropdown').width();
    //   	console.log(headerUserWidth);
    //   	$('.header-nav-user .dropdown .dropdown-menu').width(headerUserWidth);
    // });

  	if(window.matchMedia('(max-width: 767px)').matches || window.matchMedia('(max-width: 991px)').matches) {
		$('body').toggleClass('sidebar-sm');
	} else {    			
		var headerUserWidth = $('.header-nav-user').width();
  		$('.header-nav-user .dropdown .dropdown-menu').width(headerUserWidth + 28);
	} 

    // $( 'ul.pagination li' ).addClass('page-item');

    $( document ).ready(function($) {

    	var accordionHead = $('.side-menu .submenu > a'),
 			accordionBody = $('.side-menu .submenu .submenu-dd'),
 			btnClickHover,
 			leftSidebarWidth = $('.left-sidebar').width(),
 			headerWidth = $('.header-bar').width(),
 			headerLeftWidth = $('.header-bar-left').width(),
 			headerOptionsWidth = $('.header-bar-right .header-nav-options').width(),
 			headerUserWidth = $('.header-nav-user').width(),
 			searchWidth = headerWidth - (headerLeftWidth + headerOptionsWidth + headerUserWidth),
 			searchWidthSm = headerLeftWidth - (headerOptionsWidth + headerUserWidth),
 			sideMenu = $('ul.side-menu');

 		accordionHead
 			.first()
 			.addClass('active')
 				.next()
 				.slideDown('normal');

 		$.fn.btnStateChange = function(btnClickHover){ 			
 			accordionHead.on(btnClickHover, function(event) {
 				if( ( btnClickHover === 'mouseenter' || btnClickHover === 'mouseleave' ) && $('body').hasClass('sidebar-sm') || btnClickHover === 'click' ) {
		 			event.preventDefault();
		 			if($(this).attr('class') != 'active') {
		 				accordionBody.slideUp('normal');
		 				$(this).next().stop(true, true).slideToggle('normal');
			 			accordionHead.removeClass('active');
			 			$(this).addClass('active');			 			
		 			} else{
		 				accordionBody.slideUp('normal');
		 			}
	 			}
	 		});
 		};

 		$(window).btnStateChange('click');
 		$(window).btnStateChange('mouseenter');
 		$(window).btnStateChange('mouseleave');

    	$('.btn-toggle').on('click', function() {
    		$('body').toggleClass('sidebar-sm');
    	});

    	// Search button toggle
    	$('#searchBtn').on('click', function(e) {
    		e.preventDefault();
    		$('#searchForm').toggleClass('search-on');

    		if(window.matchMedia('(max-width: 767px)').matches) {
    			console.log('Result: ' + (searchWidthSm - leftSidebarWidth - 100));
    			$('input[type="text"]').css({'max-width' : (searchWidthSm - leftSidebarWidth - 85)});
    		} else {    			
    			$('input[type="text"]').css({'max-width' : searchWidth});
    		}    		
    	});

    	// Custom scrollbar style
    	$('.header-nav .dropdown-menu .content').slimScroll({
    		height: '200px',
    		size: '5px',
    		color: '#ffffff',
    		distance: '3px',
    		disableFadeOut: false,
    		railVisible: true
    	});

    	// var toggleMainMenu = function() {
    	// 	if(window.matchMedia('(max-width: 767px)').matches) {
    	// 		sideMenu.addClass('dropdown-menu');
    	// 		sideMenu.appendTo('li.nav-menu');
    	// 	} else {
    	// 		sideMenu.removeClass('dropdown-menu');
    	// 		sideMenu.appendTo('div.sidebar-content');
    	// 	}
    	// }
    	// $(window).resize(toggleMainMenu);
    	// toggleMainMenu();    	

    	/* Line Chart */
    	$("#bc-user").sparkline([5,6,7,9,9,5,3,2,2,4,6,7], {
		    type: 'line',
		    width: '100',
		    height: '30',
		    lineColor: '#00716c',
		    fillColor: '#f0f5fa',
		    spotColor: '#033b38',
		    minSpotColor: '#033b38',
		    maxSpotColor: '#033b38',
		    highlightSpotColor: '#00716c',
		    highlightLineColor: '#005e59',
		    highlightLighten: '1',
		    highlightColor: '#00716c',
		    tooltipFormat: "{{y:val}}"
		});

		/* Bar Chart*/
		$("#bc-visits").sparkline([1,3], {
		    type: 'pie',
		    height: '30',
		    sliceColors: ['#f0f5fa','#00716c']
		});

		/* Card sortable/draggable */
		$( ".card-sortable" ).sortable({
			connectWith: ".card-sortable",
			handle: ".card-drag"
		});
    	// $( ".card-sortable" ).disableSelection();

    	/* Change minimize/maximize icon on click */
    	var cardMinMaxIcon = function() {
    		$('a[id^="btn-card-mm-"').on('click', function() {
	    		if ($('a.btn-card-mm').attr('aria-expanded', 'false')) {
		    		$(this).children('i').toggleClass('fa-plus fa-minus');
		    	}
	    	});
    	}
    	cardMinMaxIcon();

    	/* Remove card on click */
    	var cardRemove = function() {
    		$('a[id^="btn-card-remove-"').on('click', function() {
	    		$(this).parents('.card-wrapper').slideToggle("slow");
	    	});
    	}
    	cardRemove();

        $('.card-header > a').on('click', function() {
            $(this).next('ul').slideToggle('slow');
        });

        /* Initiate dataTable */
        // $('#order-table').DataTable( {
        //     autoFill: true
        // });

        $('#order-table').bootstrapTable({
            formatLoadingMessage: function () {
                return '<img src="http://www.arabianbusiness.com/skins/ab.main/gfx/loading_spinner.gif" />';
            }
        });
        $("#order-table").bootstrapTable("showLoading");
        function queryParams() {
            return {
                type: 'owner',
                sort: 'updated',
                direction: 'desc',
                per_page: 100,
                page: 1
            };
        }
        $( 'div.bootstrap-table .pull-right.search' ).switchClass( "pull-right", "float-left", 200, "easeInOutQuad" );
        $( 'div.bootstrap-table button > i.icon-refresh' ).switchClass( "glyphicon glyphicon-refresh", "fa fa-refresh", 200, "easeInOutQuad" );
        $( 'div.bootstrap-table button > i.icon-th' ).switchClass( "glyphicon glyphicon-refresh", "fa fa-th-list", 200, "easeInOutQuad" );
        $( 'div.bootstrap-table button > i.icon-share' ).switchClass( "glyphicon glyphicon-refresh", "fa fa-share-square-o", 200, "easeInOutQuad" );
        // $('h5').replaceText( 'Recent Order', 'TEXT' );

        /* Initiate tooltip */
        $('[data-toggle="tooltip"]').tooltip();

    	// Add slideDown animation to Bootstrap dropdown when expanding.
		$('.dropdown').on('show.bs.dropdown', function() {
			$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
		});
		// Add slideUp animation to Bootstrap dropdown when collapsing.
		$('.dropdown').on('hide.bs.dropdown', function() {
			$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
		});
    });

}(jQuery));