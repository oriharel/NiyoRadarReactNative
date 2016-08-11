/**
 * Created by oriharel on 11/08/2016.
 */

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

export function update(friends, friendsUpdated) {
    setInterval(()=>{
        let randAmount = Math.random() * 5;
        for (var i = 0; i < randAmount; i ++) {
            friends[i].location = {
                latitude: getRandomInRange(32.17, 32.19, 6),
                longitude: getRandomInRange(34.880, 34.91, 6)
            };
        }

        friendsUpdated(friends)
    }, 5000);
}

export default {
    update
};
