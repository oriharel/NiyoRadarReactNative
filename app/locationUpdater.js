import Store from './store';


export function update() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log('received current position '+JSON.stringify(position));
            Store.setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

}

export default {
    update
};
