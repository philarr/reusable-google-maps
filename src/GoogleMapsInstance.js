// Creates a Google map DOM instance or return if it exists
// We want to reuse the Google Maps DOM element since the JS API does not supply a way to destroy an instance.

let MapInstance;
let DomElement;
let geoResult;

// Lazy load Google Maps JS API 
const loadMapsApi = (opt) => {

	if (window.google) return Promise.resolve();

	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.onload = resolve;	
		document.getElementsByTagName('head')[0].appendChild(script);
		script.src = `http://maps.googleapis.com/maps/api/js?v=3&key=${opt.key}`;
	});
}

// Reverse Geocoding (Address Lookup)
const getGeolocation = (opt) => () => {

	if (geoResult) return Promise.resolve(geoResult);

	return new Promise((resolve, reject) => {

		const latlng = { 
			lat: parseFloat(opt.location[0]), 
			lng: parseFloat(opt.location[1])
		}

 		const geocoder = new google.maps.Geocoder;
		geocoder.geocode({ 'location': latlng }, (results, status) => {
			if (status === 'OK') {
				geoResult = results;
				resolve(results);
			}
		});
	}) 
}

// Create Map element and return results
const createMapElement = (opt) => (geoResult) => {

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
}

// Return reference to DOM element or create it with Google Maps
const getDomElement = (opt) => {

	if (!DomElement) {

		return loadMapsApi(opt)
			.then(getGeolocation(opt))
			.then(createMapElement(opt))
	}
	else {
		
		return Promise.resolve({
				dom: DomElement,
				geo: geoResult
			});
	} 	 
}

export default getDomElement;