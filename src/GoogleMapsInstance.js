// Creates a Google map DOM instance or return if it exists
// We want to reuse the Google Maps DOM element since the JS API does not supply a way to destroy an instance.

let MapInstance;
let DomElement;
let geoResult;

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

	var latlng = {lat: parseFloat(opt.location[0]), lng: parseFloat(opt.location[1])};

	if (!DomElement) {
		return loadMapsApi(opt.key)

		// Reverse Geocoding (Address Lookup)
		.then(() => {
 			 const geocoder = new google.maps.Geocoder;
 			 return new Promise((resolve, reject) => {
				geocoder.geocode({ 'location': latlng }, function(results, status) {
					if (status === 'OK') {
						geoResult = results;
						resolve(results);
					}
				});
 			}) 
		})
		// Create Map element
		.then((result) => {

			const mapOptions = {
			    ...opt,
			    center: new google.maps.LatLng(opt.location[0], opt.location[1]),  
			};

			const newElement = document.createElement('div');
			MapInstance = new google.maps.Map(newElement, mapOptions);
			DomElement = newElement;

			return {
				dom: DomElement,
				geo: geoResult
			};
		});
	}
	else {
		return  Promise.resolve({
				dom: DomElement,
				geo: geoResult
			});
	} 	 
}

export default getDomElement;