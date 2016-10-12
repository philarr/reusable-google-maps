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
  key: 'ABCDEFG12345',
  zoom: 10,
  disableDefaultUI: true,
  location: this.props.contact.map
}).then((DOM) => {
  this.refs.map.appendChild(DOM);
});

```
