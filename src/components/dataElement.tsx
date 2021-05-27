import React from 'react';
import {IonItem, IonLabel, IonText, IonItemSliding, 
IonItemOption, IonItemOptions, IonIcon, IonImg} from '@ionic/react';
import {document, trash} from 'ionicons/icons';

interface Props {
   doDelete:any,
   doc:any
  }

const Item: React.FC<Props> = ({doDelete, doc}) => {
    let data = doc.data();

    return (
        <IonItemSliding>
            <IonItem>
                <IonLabel class = "ion-text-wrap">
                    <IonText className="item-title">
                        <div><strong>Name:</strong>&nbsp;
                            {data.name}
                        </div>
                    </IonText>
                    <IonText className="item-title">
                        <div><strong>Hours:</strong>&nbsp;
                            {data.hours}
                        </div>
                    </IonText>
                    <IonText className="item-sub-title">
                        <div><strong>Date:</strong>&nbsp;
                            {data.date}
                        </div>
                    </IonText>
                </IonLabel>
                <div></div>
            </IonItem>
            <IonItemOptions> 
                <IonItemOption color="danger" onClick= {() => doDelete(doc.id)}>
                    <IonIcon slot="icon-only" icon={trash}>
                    </IonIcon>
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
}
export default Item;
