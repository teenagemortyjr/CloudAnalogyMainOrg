import { LightningElement, track } from 'lwc';
import getCustomObjectList from '@salesforce/apex/defaultApex.getAllCustomObjectNameList' ;

export default class ParentBarCmp extends LightningElement {
    @track barVal = 10;
    passToParent(event){
        this.barVal = event.detail;
    }

}