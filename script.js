const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".slider-dots");
const button = document.querySelector(".click");

// button.addEventListener("click", () => {
//   button.classList.add("hidden");
// });

document.addEventListener("DOMContentLoaded", function () {
  var firstDot = document.querySelector(".slider-dot");
  if (firstDot) {
    firstDot.click();
  }
});

slides.forEach((slide, index) => {
  const dot = document.createElement("span");
  dot.classList.add("slider-dot");
  if (index === 0) {
    dot.classList.add("active");
  }
  dot.addEventListener("click", () => {
    showSlide(index);
    updateActiveDot(index);
  });
  dotsContainer.appendChild(dot);
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}

function updateActiveDot(index) {
  const dots = document.querySelectorAll(".slider-dot");
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    // center: { lat: 43.65824087578518, lng: -79.37912807238386 },
    center: { lat: 43.650430055480776, lng: -79.38000407915196 },
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

  // MARKERS ARRAY:
  const markers = [
    {
      position: { lat: 43.65824087578518, lng: -79.37912807238386 },
      label: "TMU",
      content: document.getElementById("TMU"),
    },
    {
      position: { lat: 43.658625859730684, lng: -79.37880619755346 },
      label: "Field",
      color: "white",
    },
    {
      position: { lat: 43.65850914970798, lng: -79.37922601510716 },
      label: "RAC",
      color: "white",
    },
    {
      position: { lat: 43.65878643375304, lng: -79.37845445521137 },
      label: "KHE",
    },
    {
      position: { lat: 43.65848287478277, lng: -79.37829805309764 },
      label: "Physics Lab",
    },
    {
      position: { lat: 43.657956218950936, lng: -79.3782872913672 },
      label: "Oakham",
      color: "white",
    },
    {
      position: { lat: 43.65778934890383, lng: -79.37805908319966 },
      label: "Student Centre",
    },
    {
      position: { lat: 43.65900267449497, lng: -79.37828155336963 },
      label: "Walks v2",
      color: "white",
    },
    {
      position: { lat: 43.6577813377554, lng: -79.37756304155853 },
      label: "HK Car",
      color: "white",
    },
    {
      position: { lat: 43.65775992269199, lng: -79.37732680786367 },
      label: "ENG",
    },
    {
      position: { lat: 43.657260907647824, lng: -79.37764613182641 },
      label: "DCC",
    },
    {
      position: { lat: 43.658621024761636, lng: -79.38081891734912 },
      label: "Burger",
    },
    {
      position: { lat: 43.658120947725976, lng: -79.38051457332195 },
      label: "10th Floor",
    },
    {
      position: { lat: 43.6575230345313, lng: -79.38124540918669 },
      label: "Night Sky",
      color: "white",
    },
    {
      position: { lat: 43.65781279484521, lng: -79.38114650272438 },
      label: "SLC",
    },
    {
      position: { lat: 43.65541166609907, lng: -79.38302951068114 },
      label: "TRSM",
    },
    {
      position: { lat: 43.65560863423431, lng: -79.38111669470241 },
      label: "Eaton Centre",
    },
    {
      position: { lat: 43.65542169193346, lng: -79.38037067807073 },
      label: "Popeyes",
      color: "white",
    },
    {
      position: { lat: 43.65252288407625, lng: -79.37977333859605 },
      label: "Path",
      color: "white",
    },
    {
      position: { lat: 43.66108217613649, lng: -79.3828091935429 },
      label: "Burger Factory",
      color: "white",
    },
    {
      position: { lat: 43.66011075350183, lng: -79.382859035905 },
      label: "Planet Fitness",
      color: "white",
    },
    {
      position: { lat: 43.65204989185824, lng: -79.38574242775866 },
      label: "Osgoode Hall",
    },
    {
      position: { lat: 43.653734622385564, lng: -79.3871523841026 },
      label: "Staples",
    },
    {
      position: { lat: 43.64625618586787, lng: -79.38799220644842 },
      label: "Eternal Flame",
    },
    {
      position: { lat: 43.64368606480777, lng: -79.38847751895614 },
      label: "Photo Spot",
      color: "white",
    },
    {
      position: { lat: 43.64252920196958, lng: -79.38713952993098 },
      label: "CNE",
      color: "white",
    },
    {
      position: { lat: 43.63927934595429, lng: -79.37663056190554 },
      label: "Lakeside",
      color: "white",
    },
    {
      position: { lat: 43.64539300893339, lng: -79.37977479303301 },
      label: "Union Station",
      color: "white",
    },
    {
      position: { lat: 43.643285204116424, lng: -79.37808810783277 },
      label: "Cutie",
      color: "white",
    },
    {
      position: { lat: 43.662152591456746, lng: -79.38030776970346 },
      label: "MAC",
    },
    {
      position: { lat: 43.650430055480776, lng: -79.38000407915196 },
      label: "Tree Lights",
      color: "white",
      content: document.getElementById("treeLights"),
    },
    {
      position: { lat: 43.64942126655967, lng: -79.37110434874617 },
      label: "Pizza",
      color: "white",
    },
    {
      position: { lat: 43.63318255669546, lng: -79.42051835504361 },
      label: "Actual CNE",
    },
    {
      position: { lat: 43.595699590630986, lng: -79.51488707007853 },
      label: "Humber College",
      color: "white",
    },
    {
      position: { lat: 43.64400019100414, lng: -79.38317285111812 },
      label: "LSW",
      color: "white",
    },
    {
      position: { lat: 43.656334339118, lng: -79.38092207627055 },
      label: "Hypotenuse",
    },
    {
      position: { lat: 43.656929826976636, lng: -79.38039562782517 },
      label: "School Cineplex",
      color: "white",
    },
    {
      position: { lat: 43.65568784847693, lng: -79.38287489919819 },
      label: "Best Buy",
    },
    {
      position: { lat: 43.65618247931624, lng: -79.38103258511478 },
      label: "Chaos",
    },
    {
      position: { lat: 43.65400786751346, lng: -79.38025897206492 },
      label: "Osmow's",
      color: "white",
    },
    {
      position: { lat: 43.64524989272906, lng: -79.38022123132771 },
      label: "Tim's v2",
      color: "white",
    },
    {
      position: { lat: 43.56265523914986, lng: -79.58859385416584 },
      label: "Port Credit",
    },
    {
      position: { lat: 43.56179966781032, lng: -79.58765865676892 },
      label: "That One Tree",
      color: "white",
    },
    {
      position: { lat: 43.56242071766618, lng: -79.58728633043648 },
      label: "Maybe...",
    },
    {
      position: { lat: 43.56167193241856, lng: -79.58571612946365 },
      label: "That Other Tree",
    },
    {
      position: { lat: 43.562582978804215, lng: -79.58799980271505 },
      label: "Photography",
      color: "white",
    },
    {
      position: { lat: 43.562538196320915, lng: -79.5890732962858 },
      label: "Library",
      color: "white",
    },
    {
      position: { lat: 43.56285127605362, lng: -79.58836691200247 },
      label: "Courtyard",
      color: "white",
    },
    {
      position: { lat: 43.56273018258656, lng: -79.58822077153106 },
      label: "Cafeteria",
      color: "white",
    },
    {
      position: { lat: 43.56302856355243, lng: -79.58794059747046 },
      label: "Second Floor",
      color: "white",
    },
    {
      position: { lat: 43.563041516132344, lng: -79.58773537266372 },
      label: "Benches",
      color: "white",
    },
    {
      position: { lat: 43.56293867624747, lng: -79.58849811940769 },
      label: "Physics",
    },
    {
      position: { lat: 43.56236824539975, lng: -79.58790387871602 },
      label: "Big Tree",
      color: "white",
    },
    {
      position: { lat: 43.559469575926705, lng: -79.5869567270192 },
      label: "Tim's",
      color: "white",
    },
    {
      position: { lat: 43.56897339019679, lng: -79.5983800177784 },
      label: "Tunnel",
      color: "white",
    },
    {
      position: { lat: 43.591813100328935, lng: -79.66712088172024 },
      label: "Mambo Italiano",
    },
    {
      position: { lat: 43.56737611669899, lng: -79.65135955331208 },
      label: "Grad",
      color: "white",
    },
    {
      position: { lat: 43.5230698870948, lng: -79.7035921580701 },
      label: "Ayet Bday",
      color: "white",
    },
    {
      position: { lat: 43.645146410671934, lng: -79.70834430174916 },
      label: "Prom",
      color: "white",
    },
    {
      position: { lat: 43.839403221323536, lng: -79.54191624235395 },
      label: "Wonderland",
      color: "white",
    },
    {
      position: { lat: 43.59300050102515, lng: -79.64250063873888 },
      label: "Square One",
    },
    {
      position: { lat: 43.593083501804415, lng: -79.65062090480062 },
      label: "Cineplex",
    },
    {
      position: { lat: 43.56175395419997, lng: -79.59041860712493 },
      label: "Spare Walk",
    },
    {
      position: { lat: 43.56383830916969, lng: -79.58768676099781 },
      label: "Wedding",
      color: "white",
    },
    {
      position: { lat: 43.55232800034318, lng: -79.38500731318793 },
      label: "Blue Park",
      color: "white",
    },
    {
      position: { lat: 43.659702461241615, lng: -79.38500731318793 },
      label: "Pizza Pizza",
      color: "white",
    },
  ];

  // alert(markers[30].label);

  count = markers.length;
  document.getElementById("pins").innerHTML = "Pins Left: " + count;

  window.mapMarkers = [];

  markers.forEach((markerInfo) => {
    const infowindow = new google.maps.InfoWindow({
      content: markerInfo.content,
    });
    const marker = new google.maps.Marker({
      position: markerInfo.position,
      map,
      icon: {
        url: "img//marker.png",
        labelOrigin: new google.maps.Point(15, 50),
      },
    });

    google.maps.event.addListener(marker, "mouseover", function (evt) {
      marker.setLabel({
        text: markerInfo.label,
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Poppins",
        color: markerInfo.color,
      });
    });

    google.maps.event.addListener(marker, "mouseout", function (evt) {
      marker.setLabel({
        text: " ",
      });
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
      let icon = marker.getIcon();
      if (icon.url != "img//darkerMarker.png") {
        count--;
        document.getElementById("pins").innerHTML = "Pins Left: " + count;
      }
      marker.setIcon({
        url: "img//darkerMarker.png",
        labelOrigin: new google.maps.Point(15, 50),
      });
    });

    window.mapMarkers.push(marker);
  });

  map.addListener("zoom_changed", () => {
    const currentZoom = map.getZoom();
    const zoomThreshold = 14;

    window.mapMarkers.forEach((marker) => {
      if (currentZoom < zoomThreshold) {
        marker.setMap(null);
      } else {
        marker.setMap(map);
      }
    });
  });
}

window.initMap = initMap;
