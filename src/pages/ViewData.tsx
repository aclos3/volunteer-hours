import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './ViewData.css';
import DataList from '../components/dataList';

const ViewData: React.FC = () => {
    const [current, setCurrent] = useState(null);
    const getEmpty=()=>{
        return ({
          title: '',
          content: '',
          date: '',
          location: '',
          picture: '',
          clear:'',
          initialValue:''
        });
    }

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
        <DataList doEdit={setCurrent}></DataList>
      </IonContent>
    </IonPage>
  );
};

export default ViewData;
