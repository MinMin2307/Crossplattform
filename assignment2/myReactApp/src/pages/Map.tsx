import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const SetMapCenter = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return null;
};

const Map: React.FC = () => {
  const history = useHistory();

  const [ownLocation, setOwnLocation] = useState<[number, number] | null>(null); // Lat Lon from my device
  const [issLocation, setIssLocation] = useState<[number, number] | null>(null); // Lat Lon from ISS
  const defaultPosition: [number, number] = [51.505, -0.09]; // Default test position

  // Function to get device location
  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOwnLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting device location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Fetch ISS current location
  const fetchIssLocation = () => {
    fetch('http://api.open-notify.org/iss-now.json')
      .then((response) => response.json())
      .then((data) => {
        const lat = parseFloat(data.iss_position.latitude);
        const lon = parseFloat(data.iss_position.longitude);
        setIssLocation([lat, lon]);
      })
      .catch((error) => {
        console.error("Error fetching ISS location", error);
      });
  };

  useEffect(() => {
    getDeviceLocation();
    fetchIssLocation();

    const intervalId = setInterval(() => {
      fetchIssLocation();
    }, 5000);

    return () => clearInterval(intervalId); 
  }, []);

  const goToHomePage = () => {
    history.push('/');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome to the Map Page</h1>
        <IonButton onClick={goToHomePage}>Go to Home Page</IonButton>
        
        <IonButton onClick={getDeviceLocation}>Jump to My Location</IonButton>

        <div id="map" style={{ height: "500px" }}>
          <MapContainer center={defaultPosition} zoom={3} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {ownLocation && (
              <Marker position={ownLocation}>
                <Popup>Your Location</Popup>
                <SetMapCenter position={ownLocation} />
              </Marker>
            )}

            {issLocation && (
              <Marker position={issLocation} icon={L.divIcon({ className: 'iss-icon', html: '🚀' })}>
                <Popup>ISS is here</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Map;
