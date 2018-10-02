export default function GoogleMap(mapId) {
    var map, popup, Popup;
    var mapElement = document.getElementById(''+mapId+'');
    var coordinates = {
        lat: 55.782146,
        lng: 37.582482
    };
    var mapOptions = {
        center: coordinates,
        zoom: 17
    };

    function definePopupClass() {
        Popup = function(position, content) {
            this.position = position;

            content.classList.add('popup-bubble-content');

            var pixelOffset = document.createElement('div');
            pixelOffset.classList.add('popup-bubble-anchor');
            pixelOffset.appendChild(content);

            this.anchor = document.createElement('div');
            this.anchor.classList.add('popup-tip-anchor');
            this.anchor.appendChild(pixelOffset);

            this.stopEventPropagation();
        };
        Popup.prototype = Object.create(google.maps.OverlayView.prototype);


        Popup.prototype.onAdd = function() {
            this.getPanes().floatPane.appendChild(this.anchor);
        };


        Popup.prototype.onRemove = function() {
            if (this.anchor.parentElement) {
                this.anchor.parentElement.removeChild(this.anchor);
            }
        };


        Popup.prototype.draw = function() {
            var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

            var display =
                Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                'block' :
                'none';

            if (display === 'block') {
                this.anchor.style.left = divPosition.x + 'px';
                this.anchor.style.top = divPosition.y + 'px';
            }
            if (this.anchor.style.display !== display) {
                this.anchor.style.display = display;
            }
        };

        Popup.prototype.stopEventPropagation = function() {
            var anchor = this.anchor;
            anchor.style.cursor = 'auto';

            ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart','pointerdown'].forEach(function(event) {
                anchor.addEventListener(event, function(e) {
                    e.stopPropagation();
                });
            });
        };
    };
    function setMarker() {
        var marker = new google.maps.Marker({
            map: map,
            icon: './img/marker.svg',
            position: coordinates,
            title: 'Москва 3-я улица Ямского Поля, д. 2 корпус 26 офис 30'
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }
    function initMap() {
        definePopupClass();
        map = new google.maps.Map(mapElement, mapOptions);
        setMarker();
        popup = new Popup(new google.maps.LatLng(55.782146, 37.582482), document.getElementById('infoWindowPopap'));
        popup.setMap(map);
    }
    initMap();
}