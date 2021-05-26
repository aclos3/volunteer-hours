import React, {useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, list } from 'ionicons/icons';
import DataInput from './pages/DataInput';
import ViewData from './pages/ViewData';
import DataProps from './components/DataProps';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

//Firebase import
import firebase from 'firebase/app';
import { firebaseAPI } from './components/private/keys';

firebase.initializeApp(firebaseAPI());

const App: React.FC = () => {
    const [current, setCurrent] = useState<DataProps | null>(null);

    const getEmpty=()=>{
    return ({
        name: '',
        hours: 0,
        date: '',
        location: '',
        clear:'',
        initialValue:''
        });
    }
    
    return (
        <IonApp>
            <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                <Route exact path="/DataInput">
                    <DataInput initialValue={current} clear={()=>setCurrent(getEmpty())}/>
                </Route>
                <Route exact path="/ViewData">
                    <ViewData />
                </Route>
                <Route exact path="/">
                    <Redirect to="/DataInput" />
                </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                <IonTabButton tab="DataInput" href="/DataInput">
                    <IonIcon icon={list} />
                    <IonLabel>Input</IonLabel>
                </IonTabButton>
                <IonTabButton tab="ViewData" href="/ViewData">
                    <IonIcon icon={ellipse} />
                    <IonLabel>View Data</IonLabel>
                </IonTabButton>
                
                </IonTabBar>
            </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};
export default App;
