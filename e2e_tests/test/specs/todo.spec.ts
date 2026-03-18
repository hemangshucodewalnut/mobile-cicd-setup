import { expect } from '@wdio/globals'

describe('TODO Application E2E', () => {
    it('should create a new task successfully', async () => {
        const addButton = await $('android=new UiSelector().text("New Task")');
    });
});