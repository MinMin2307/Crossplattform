import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import picture from '../components/picture.jpg';
import packageJson from '../../package.json';

const About: React.FC = () => {
  const history = useHistory();

  const goToHomePage = () => {
    history.push('/'); 
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome to the About Page</h1>
        <IonButton onClick={goToHomePage}>Go to Home Page</IonButton>
        <div>
            <img src={picture} style={{height:'100px', width:'200px'}}></img>
        </div>
        <IonItem>
          <IonLabel>
            <h2>App Information</h2>
            <p>Version: {packageJson.version}</p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2>Information about Developer</h2>
            <p>Name: Mine Sungur</p>
            <p>Email: if23b212@technikum-wien.at</p>
            <p>Degree program: Computer Science / 5D1</p>
          </IonLabel>
        </IonItem>
        
      </IonContent>
    </IonPage>
  );
};

export default About;
