import { LightningElement, track, api } from 'lwc';
import findRecords from '@salesforce/apex/CustomLookupController.findRecords';
import findProducts from '@salesforce/apex/CustomLookupController.findPricebookProducts';

export default class CustomLookup extends LightningElement {
    @track records;
    @track error;
    @api selectedRecord;
    @api index;
    @api relationshipfield;
    @api iconname = "standard:account";
    @api objectName;
    @api searchfield = 'Name';
    @api selectedRecordId;
    @api placeholder = "Search Records";
    @api pricebookId;
    @api currencyIsoCode;
    @api recordNumber;

    get selectedRecordName() {
        let name;
        // if (this.selectedRecord.Specialist__r) {
        // 	name = this.selectedRecord.Specialist__r.Name;
        // } else if (this.selectedRecord.Lead_Gen__r) {
        // 	name = this.selectedRecord.Lead_Gen__r.Name;
        // } else {
        name = this.selectedRecord.Name;
        // }
        return name;
    }

    get validSelectedRecord() {
        return this.selectedRecord && this.selectedRecordName;
    }

    handleOnchange(event) {
        const searchKey = event.detail;
        if (this.objectName == 'PricebookEntry') {
            this.findPricebookProducts(searchKey);
        } else {
            this.findRecords(searchKey);
        }
    }

    findPricebookProducts(searchKey) {
        debugger;
        findProducts({
                searchKey: searchKey,
                pricebookId: this.pricebookId,
                currencyIsoCode: this.currencyIsoCode
            })
            .then(result => {
                this.records = JSON.parse(JSON.stringify(result));
                for (let i = 0; i < this.records.length; i++) {
                    const rec = this.records[i];
                    this.records[i].Name = rec.Product2.Name;
                    this.records[i].Id = rec.Id;
                }
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.records = undefined;
            });
    }
    findRecords(searchKey) {
        findRecords({
                searchKey: searchKey,
                objectName: this.objectName,
                searchField: this.searchfield
            })
            .then(result => {
                this.records = result;
                for (let i = 0; i < this.records.length; i++) {
                    const rec = this.records[i];
                    this.records[i].Name = rec[this.searchfield];
                }
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.records = undefined;
            });
    }

    handleSelect(event) {
        const selectedRecordId = event.detail;
        this.selectedRecord = this.records.find(record => record.Id === selectedRecordId);
        const selectedRecordEvent = new CustomEvent(
            "selectedrec", {
                detail: {
                    recordId: selectedRecordId,
                    recordName: this.selectedRecord.Name,
                    index: this.index,
                    relationshipfield: this.relationshipfield,
                    selectedRecord: this.selectedRecord,
                    recordNumber: this.recordNumber
                }
            }
        );
        this.dispatchEvent(selectedRecordEvent);
    }

    handleRemove(event) {
        event.preventDefault();
        this.selectedRecord = undefined;
        this.records = undefined;
        this.error = undefined;
        const selectedRecordEvent = new CustomEvent(
            "selectedrec", {
                detail: {
                    recordId: undefined,
                    index: this.index,
                    relationshipfield: this.relationshipfield,
                    recordName: undefined,
                    selectedRecord: undefined,
                    recordNumber: this.recordNumber
                }
            }
        );
        this.dispatchEvent(selectedRecordEvent);
    }


}