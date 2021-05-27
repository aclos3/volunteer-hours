import React from 'react';
import Item from "./dataElement";
import firebase from 'firebase';
import {useCollection} from "react-firebase-hooks/firestore";
import {IonList} from '@ionic/react';

interface Props {
    doEdit:any
   }
const DataList: React.FC<Props> = ({doEdit}) => {
    const [value, loading, error] = useCollection(
        firebase.firestore().collection("data").orderBy("date","desc"),
        {
            snapshotListenOptions:{includeMetadataChanges: true}
        }
    );
    const closeSlidingItems = () => {
        
        let list = document.getElementById("list") as any;
        list.closeSlidingItems();
    };
    const doDelete = (id: any) => {
        firebase.firestore().collection("data").doc(id).delete();
    };
    return (
        <IonList id="list">
            {value && 
            value.docs.map(doc => {
                console.log("hi");
                return (
                    !loading && (
                        <Item doc={doc}
                        doDelete = {(i: any) => {
                            closeSlidingItems();
                            doDelete(i);
                        }}
                    key = {doc.id}
                    />
                    )
                );
            })}
        </IonList>
    );
}
export default DataList;
