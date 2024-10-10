import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Profil: React.FC = () => {
  type Profile = {
    name: string;
    address: string;
    email: string;
    profilePicture: string;
  };

  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>(''); // storing the base64 string

  const history = useHistory();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const loadedProfile = localStorage.getItem('profile');
    if (loadedProfile) {
      const profile: Profile = JSON.parse(loadedProfile); 
      setName(profile.name);
      setAddress(profile.address);
      setEmail(profile.email);
      setProfilePicture(profile.profilePicture);
    }
  };

  const saveProfile = () => {
    const profile: Profile = {
      name,
      address,
      email,
      profilePicture,
    };

    localStorage.setItem('profile', JSON.stringify(profile));

    alert('Profile saved successfully!');

    history.push('/');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePicture(base64String);
      };
      reader.readAsDataURL(file); 
    }
  };

  const goToHomePage = () => {
    history.push('/');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome to the Profil Page</h1>

        <IonItem>
          <IonInput
            value={name}
            placeholder="Enter Name"
            onIonChange={(e) => setName(e.detail.value!)}
            label="Name"
          />
        </IonItem>

        <IonItem>
          <IonInput
            value={address}
            placeholder="Enter Address"
            onIonChange={(e) => setAddress(e.detail.value!)}
            label="Address"
          />
        </IonItem>

        <IonItem>
          <IonInput
            value={email}
            type="email"
            placeholder="Enter Email"
            onIonChange={(e) => setEmail(e.detail.value!)}
            label="Email"
          />
        </IonItem>

        <IonItem>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </IonItem>

        {profilePicture && (
          <IonItem>
            <img src={profilePicture} alt="Profile" style={{ width: '100px', height: '100px' }} />
          </IonItem>
        )}

        <IonButton expand="block" onClick={saveProfile}>
          Save Profile
        </IonButton>

        <IonButton expand="block" onClick={goToHomePage}>
          Go to Home Page
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profil;
