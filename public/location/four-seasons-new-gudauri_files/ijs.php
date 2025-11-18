jQuery(function(){
	jQuery('.wtooltip').tooltip();
	jQuery('#resp-menu').sidr({ name: 'left-menu', side: 'left', source: '.elx_menu', body: '#repmenu-container' })
	jQuery('.navigation ul.elx_menu').superfish({ speed:'fast', animation: {opacity:'show', height:'show'}});
});