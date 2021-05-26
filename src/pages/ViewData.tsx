import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './ViewData.css';
import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const ViewData: React.FC = () => {
    const [current, setCurrent] = useState(null);
    
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>View Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">View Data</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="View Data Page" />
      </IonContent>
    </IonPage>
  );
};

export default ViewData;
