function flyTo(map, target, duration = 2000) {
  const safeTarget = {
    center: target.center,
    zoom: typeof target.zoom === "number" ? target.zoom : map.getZoom(),
  };

  const start = {
    center: map.getCenter(),
    zoom: map.getZoom(),
  };

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
      start.center.lat() +
      (safeTarget.center.lat - start.center.lat()) * easedProgress;
    const lng =
      start.center.lng() +
      (safeTarget.center.lng - start.center.lng()) * easedProgress;

    map.moveCamera({ center: { lat, lng }, zoom });

    if (linearProgress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

export default { flyTo };
