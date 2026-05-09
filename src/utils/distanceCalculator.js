const toRadians = (value) => {
    return value * (Math.PI / 180);
};

const getDistanceInKm = (
    userLat,
    userLng,
    schoolLat,
    schoolLng
) => {
    const earthRadius = 6371;

    const latitudeDifference =
        toRadians(schoolLat - userLat);

    const longitudeDifference =
        toRadians(schoolLng - userLng);

    const calculation =
        Math.sin(latitudeDifference / 2) ** 2 +
        Math.cos(toRadians(userLat)) *
        Math.cos(toRadians(schoolLat)) *
        Math.sin(longitudeDifference / 2) ** 2;

    const finalValue =
        2 *
        Math.atan2(
            Math.sqrt(calculation),
            Math.sqrt(1 - calculation)
        );

    return earthRadius * finalValue;
};

module.exports = getDistanceInKm;