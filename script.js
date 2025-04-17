const MAX_FILE_SIZE = 1.5; // MB

function getLocalStorageSize() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const value = localStorage.getItem(key);
      total += key.length + value.length;
    }
  }
  return (total * 2) / (1024 * 1024);
}

function dotCheck(slideContainer) {
  const slides = slideContainer.querySelectorAll(".slide");
  const dotsContainer = slideContainer.querySelector(".slider-dots");

  // Clear any existing dots first
  dotsContainer.innerHTML = "";

  // Create dots for each slide
  slides.forEach((slide, index) => {
    const dot = document.createElement("span");
    dot.classList.add("slider-dot");
    if (index === 0) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      showSlide(slides, index);
      updateActiveDot(dotsContainer, index);
    });
    dotsContainer.appendChild(dot);
  });

  // Make sure the first slide is active
  showSlide(slides, 0);
}

function showSlide(slides, index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}

function updateActiveDot(dotsContainer, index) {
  const dots = dotsContainer.querySelectorAll(".slider-dot");
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function openModal() {
  document.getElementById("addLocationModal").style.display = "block";
}

function closeModal() {
  document.getElementById("addLocationModal").style.display = "none";
}

let map;
let coords;
let count = 0;
let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.65824087578518, lng: -79.37912807238386 },
    // center: { lat: 43.650430055480776, lng: -79.38000407915196 },
    zoom: 17.5,
    mapTypeId: "hybrid",
    tilt: 0,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  });

  loadSavedMarkers();

  map.addListener("click", function (event) {
    coords = event.latLng;
    openModal();
  });

  // map.addListener("zoom_changed", () => {
  //   const currentZoom = map.getZoom();
  //   const zoomThreshold = 14;

  //   window.mapMarkers.forEach((marker) => {
  //     if (currentZoom < zoomThreshold) {
  //       marker.setMap(null);
  //     } else {
  //       marker.setMap(map);
  //     }
  //   });
  // });
}

function saveMarkers() {
  const markersData = markers.map((marker) => {
    const infoContent = marker.infoContent;
    return {
      position: {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
      },
      label: marker.labelText || "",
      description: infoContent.description,
      mediaUrls: infoContent.mediaUrls || [],
    };
  });
  localStorage.setItem("mapMarkers", JSON.stringify(markersData));
}

function loadSavedMarkers() {
  const savedMarkers = localStorage.getItem("mapMarkers");

  if (savedMarkers) {
    const markersData = JSON.parse(savedMarkers);
    markersData.forEach((markerData) => {
      count++;

      // InfoWindow content
      const newPlaceContent = document.createElement("div");
      newPlaceContent.id = `place-${count}`;

      const descriptionElem = document.createElement("h2");
      descriptionElem.textContent = markerData.description;
      newPlaceContent.appendChild(descriptionElem);

      if (markerData.mediaUrls && markerData.mediaUrls.length > 0) {
        const slider = document.createElement("div");
        slider.classList.add("slider");

        markerData.mediaUrls.forEach((mediaUrl) => {
          const isImage = mediaUrl.startsWith("data:image/");
          const mediaElement = document.createElement(
            isImage ? "img" : "video"
          );
          mediaElement.classList.add("slide");
          mediaElement.src = mediaUrl;

          if (!isImage) {
            mediaElement.controls = true;
          }

          slider.appendChild(mediaElement);
        });

        newPlaceContent.appendChild(slider);

        const sliderDots = document.createElement("div");
        sliderDots.classList.add("slider-dots");
        newPlaceContent.appendChild(sliderDots);

        if (slider.children.length >= 1) {
          dotCheck(newPlaceContent);
        }
      }

      const infowindow = new google.maps.InfoWindow({
        content: newPlaceContent,
      });

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          markerData.position.lat,
          markerData.position.lng
        ),
        map,
        icon: {
          url: "img/marker.png",
          labelOrigin: new google.maps.Point(15, 50),
        },
      });

      marker.infoContent = {
        description: markerData.description,
        mediaUrls: markerData.mediaUrls,
      };

      marker.addListener("mouseover", function () {
        marker.setLabel({
          text: markerData.label,
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "Poppins",
          className: "label",
        });
      });

      marker.addListener("mouseout", function () {
        marker.setLabel({
          text: " ",
        });
      });

      marker.addListener("click", function () {
        infowindow.open(map, marker);
        marker.setIcon({
          url: "img/darkerMarker.png",
          labelOrigin: new google.maps.Point(15, 50),
        });
      });

      markers.push(marker);
    });

    // marker.setLabel({
    //   text: markerData.label,
    //   fontSize: "14px",
    //   fontWeight: "bold",
    //   fontFamily: "Poppins",
    //   className: "label",
    // });

    // marker.addListener("click", function () {
    //   infowindow.open(map, marker);
    // });

    // markers.push(marker);
    // });
    window.mapMarkers = markers;
  }
}

document
  .getElementById("addLocationModal")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const label = document.getElementById("placeTitle").value;
    const description = document.getElementById("placeDescription").value;
    const files = document.getElementById("placeFiles").files;

    for (const file of files) {
      const mb = file.size / (1024 * 1024);
      if (mb > MAX_FILE_SIZE) {
        alert(`Each file must be under ${MAX_FILE_SIZE}MB.`);
        return;
      }
    }
    // const usedMB = getLocalStorageSize();
    // console.log(`Used Storage: ${usedMB.toFixed(2)} MB`);

    if (getLocalStorageSize() > 4.5) {
      alert(
        "You're running out of storage space! Consider removing some markers."
      );
    }

    if (files.length > 5) {
      alert("You can only upload up to 5 files.");
      return;
    }

    count++;

    const newPlaceContent = document.createElement("div");
    newPlaceContent.id = `place-${count}`;

    const descriptionElem = document.createElement("h2");
    descriptionElem.textContent = description;
    newPlaceContent.appendChild(descriptionElem);

    const slider = document.createElement("div");
    slider.classList.add("slider");

    const mediaUrls = [];

    // STEP 1: Show the media immediately in the slider (preview)
    Array.from(files).forEach((file) => {
      const mediaElement = document.createElement(
        file.type.startsWith("image") ? "img" : "video"
      );
      mediaElement.classList.add("slide");

      const objectURL = URL.createObjectURL(file);
      mediaElement.src = objectURL;

      if (file.type.startsWith("video")) {
        mediaElement.controls = true;
      }

      slider.appendChild(mediaElement);
    });

    // STEP 2: Read and save the files as base64 (asynchronously)
    const readFileAsDataURL = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    };

    newPlaceContent.appendChild(slider);

    const sliderDots = document.createElement("div");
    sliderDots.classList.add("slider-dots");
    newPlaceContent.appendChild(sliderDots);

    // Create the InfoWindow content
    const infowindow = new google.maps.InfoWindow({
      content: newPlaceContent,
    });

    // Create the marker
    const marker = new google.maps.Marker({
      position: coords,
      map,
      icon: {
        url: "img/marker.png",
        labelOrigin: new google.maps.Point(15, 50),
      },
    });

    marker.labelText = label;

    marker.infoContent = {
      description: description,
      mediaUrls: mediaUrls, // This will be populated async by the FileReader
    };

    marker.addListener("mouseover", function () {
      marker.setLabel({
        text: label,
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Poppins",
        className: "label",
      });
    });

    marker.addListener("mouseout", function () {
      marker.setLabel({
        text: " ",
      });
    });

    marker.addListener("click", function () {
      infowindow.open(map, marker);
      marker.setIcon({
        url: "img/darkerMarker.png",
        labelOrigin: new google.maps.Point(15, 50),
      });
    });

    markers.push(marker);
    window.mapMarkers = markers;

    Promise.all(Array.from(files).map(readFileAsDataURL)).then((base64Urls) => {
      mediaUrls.push(...base64Urls);

      // Assign to the last added marker
      markers[markers.length - 1].infoContent.mediaUrls = mediaUrls;

      // Save to localStorage
      saveMarkers();
    });

    if (files.length === 0) {
      saveMarkers();
    }

    closeModal();
    document.getElementById("addPlaceForm").reset();

    if (slider.children.length >= 1) {
      // Call dotCheck directly, passing the specific container
      dotCheck(newPlaceContent);
    }
  });

window.initMap = initMap;
