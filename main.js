var ll;

function supports_geolocation() {
  return !!navigator.geolocation;
}

function get_location() {
	navigator.geolocation.getCurrentPosition(show_map, handle_error);
}

function show_map(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	ll = latitude+","+longitude;
	return ll;
}

function handle_error(err) {
  if (err.code == 1) {
    console.log("i feel terrible :/");
  }
}
