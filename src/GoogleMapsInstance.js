// Creates a Google map DOM instance or return if it exists
// We want to reuse the Google Maps DOM element since the JS API does not supply a way to destroy an instance.

let MapInstance;
let DomElement;



// Lazy load Google Maps JS API 
const loadMapsApi =(apiKey) => {

	if (window.google) return Promise.resolve();

	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.onload = resolve;	
		document.getElementsByTagName('head')[0].appendChild(script);
		script.src = `http://maps.googleapis.com/maps/api/js?v=3&key=${apiKey}`;
	});
}

// Return reference to DOM element or create it with Google Maps
const getDomElement = (opt) => {

	if (!DomElement) {
		return loadMapsApi(opt.key).then(() => {

			const mapOptions = {
			    zoom: opt.zoom,
			    disableDefaultUI: opt.disableDefaultUI,
			    center: new google.maps.LatLng(opt.location[0], opt.location[1]),  
			    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
			};

			const newElement = document.createElement('div');
			MapInstance = new google.maps.Map(newElement, mapOptions);
			DomElement = newElement;

			return DomElement;
		});
	}
	else {
		console.log('DomElement exists, returning old');
		return  Promise.resolve(DomElement);
	} 	 
}

export default getDomElement;