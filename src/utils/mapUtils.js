function flyTo(map, target, duration = 2000) {
  if (!map || !target || !target.center) return;
  const safeTarget = {
    center: target.center,
    zoom: typeof target.zoom === "number" ? target.zoom : map.getZoom(),
  };

  const start = {
    center: { lat: map.getCenter().lat(), lng: map.getCenter().lng() },
    zoom: map.getZoom(),
  };

  console.log(getDistanceInMiles(start.center, safeTarget.center));
  if (getDistanceInMiles(start.center, safeTarget.center) > 50) {
    map.setCenter(safeTarget.center);
    map.setZoom(safeTarget.zoom);
    return;
  }

  const peakZoom = 14;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animate(now) {
    const linearProgress = Math.min((now - startTime) / duration, 1);
    const easedProgress = easeInOutCubic(linearProgress);
    let zoom;

    if (linearProgress < 0.5) {
      // First half: Animate from start.zoom to peakZoom
      const firstHalfProgress = linearProgress * 2;
      const easedFirstHalf = easeInOutCubic(firstHalfProgress);
      zoom = start.zoom + (peakZoom - start.zoom) * easedFirstHalf;
    } else {
      // Second half: Animate from peakZoom to safeTarget.zoom
      const secondHalfProgress = (linearProgress - 0.5) * 2;
      const easedSecondHalf = easeInOutCubic(secondHalfProgress);
      zoom = peakZoom + (safeTarget.zoom - peakZoom) * easedSecondHalf;
    }

    const lat =
      start.center.lat +
      (safeTarget.center.lat - start.center.lat) * easedProgress;
    const lng =
      start.center.lng +
      (safeTarget.center.lng - start.center.lng) * easedProgress;

    map.moveCamera({ center: { lat, lng }, zoom });

    if (linearProgress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function getDistanceInMiles(pointA, pointB) {
  const { lat: lat1, lng: lon1 } = pointA;
  const { lat: lat2, lng: lon2 } = pointB;

  // Earth's radius in miles.
  const R = 3958.8;

  // Convert degrees to radians.
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);

  // Haversine formula calculation.
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(radLat1) *
      Math.cos(radLat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}

export default { flyTo };
