import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Home: React.FC = () => {
  const [persons, setPersons] = useState<any[]>([]); // Set state to an array of any type

  const history = useHistory();

  const goToMapPage = () => {
    history.push('/map');
  };

  const goToProfilePage = () => {
    history.push('/profil');
  };

  const goToAboutPage = () => {
    history.push('/about');
  };

  const fetchPersons = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setPersons(res.data); 
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    fetchPersons();
  }, []); 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome to the Home Page</h1>
        <IonButton onClick={goToMapPage}>Go to Map Page</IonButton>
        <IonButton onClick={goToProfilePage}>Go to Profile Page</IonButton>
        <IonButton onClick={goToAboutPage}>Go to About Page</IonButton>

        <ul>
          {persons.map((person: any) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default Home;
