import { type Page, expect } from '@playwright/test';
import { GRCelements } from './GRC.elements';
import path from 'path';
import { BaseActions } from '../base/base.actions';



export class GRCactions {
    readonly page: Page;
    readonly GRCElements: GRCelements;
   


    constructor(page: Page) {
        this.GRCElements = new GRCelements(page);
        this.page = page
    }




}