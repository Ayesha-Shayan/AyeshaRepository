import { LightningElement, track, api } from 'lwc';

export default class SearchComponent extends LightningElement {

    @api placeholder;

    @track searchKey;
    handleChange(event) {
        event.preventDefault();
        const searchKey = event.target.value;
        const searchEvent = new CustomEvent(
            'inputchanged', 
            { 
                detail : searchKey
            }
        );
        this.dispatchEvent(searchEvent);
    }
}