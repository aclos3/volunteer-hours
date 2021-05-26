import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import DataProps from '../components/DataProps';
import {useDocument} from "react-firebase-hooks/firestore";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
    IonInput, IonItem, IonLabel, IonList, IonButton, IonDatetime } from '@ionic/react';
import './DataInput.css';

export function debugInfo(logInfo: DataProps){
    console.log(logInfo.name,logInfo.hours,logInfo.date);
};

export function clearInfo(info: DataProps){
    info.name='';
    info.hours=0;
    info.date='';
};

const todaysDate = () => {
    var today = new Date();
    var editDate = today.toDateString(); 
    const splitDate = editDate.split(' ');
    var numMon = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(splitDate[1]) / 3 + 1;
    if(numMon < 10) {
        return(splitDate[3] + "-0" + numMon + "-" + splitDate[2]);
    }
    else {
        return(splitDate[3] + "-" + numMon + "-" + splitDate[2]);
    }
};

const DataInput: React.FC<DataProps> = (props) => {
    const [item, setItem] = useState<DataProps>({
        name: '',
        hours: 0,
        date: '',
      });
    
    const [value, loading, error] = useDocument(
        firebase.firestore().doc("items/" + props.initialValue),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );

    useEffect(() => {
        !loading && props.initialValue && value?.exists && setItem(value.data()?.name);
    }, 
    [loading, props.initialValue, value]);
    
    const getValid = async () => {

        let collectionRef = firebase.firestore().collection("data");
        if(!item.date) {
            item.date = todaysDate();
        }
        else {
            const newDate = item.date.split('T');
            item.date = newDate[0];
        }

        if(props.name) {
            console.log("Name populated! name: " + item.name + ", Hours: " + item.hours + ", Date: " + item.date)
            await(collectionRef).doc(props.name).set({name: item.name, hours: item.hours, date: item.date,
                createdOn: new Date().getTime(),}, {merge:true});
            clearInfo(item);
            setItem(item);
                props.clear();
        }
        else {
            console.log("Name new! name: " + item.name + ", Hours: " + item.hours + ", Date: " + item.date)
            await collectionRef.add({name: item.name, hours: item.hours, date: item.date, 
                createdOn: new Date().getTime(),
                });
            clearInfo(item);
            setItem(item);
            props.clear();
        }
    };
    
    const updateField = (e: any) => {
        e.preventDefault();
        debugInfo(item);
        setItem({
          ...item,
          [e.target.name]: e.target.value
        });
    };
    
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Enter Data</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Name:</IonLabel>
                        <IonInput required={true} value={item.name}  name="name" onIonChange={updateField}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Hours Worked:</IonLabel>
                        <IonInput required={true} type="number" value={item.hours} name="hours" onIonChange={updateField}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Date:</IonLabel>
                        <IonDatetime placeholder={todaysDate()} value={item.date} name="date" onIonChange={updateField}></IonDatetime>
                    </IonItem>
                </IonList>
                <IonButton type="submit" onClick={()=>{
                    getValid();
                }}>Submit</IonButton>
          </IonContent>
        </IonPage>
      );
};
export default DataInput;
