# reusable-google-maps
Wrapper for Google Maps JS API DOM element to allow reusability in Single Page Apps 

##Why?
Google Maps JS API does not come with a reliable way to destroy existing map instances so we need to prevent memory leaks and recreation of the Maps DOM element each time a map page is loaded.

##How?
It will keep a reference to the DOM element used by `google.maps.Map` and return it if exists. 
If not, it will lazily load the Maps JS API and create a new instance to be used.

##Usage
```js
import GoogleMap from 'GoogleMapsInstance';

GoogleMap({
  key: 'ABCDEFG12345', //API Key
  zoom: 11,
  navigationControl: false,
  mapTypeControl: false,
  scaleControl: false,
  draggable: false,
  scrollwheel: false,
  disableDefaultUI: true,
  location: [123,-123]
  }).then((result) => {
    // result is an object with 2 keys, dom (map element) and geo (google geocode result)
    const { dom, geo } = result;
    const { mapNode, location } = this.refs;
    mapNode.appendChild(dom);
    location.innerHTML = `${geo[2].address_components[1].short_name}, ${geo[2].address_components[3].short_name}`;
  });

```
