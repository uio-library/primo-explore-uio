import prmSearchAfterComponent from './prmSearchAfter.component';

const app = angular.module('viewCustom', ['angularLoad']);

// SearchAfter: Everything below the searchbar. Reloaded on normal page changes
app.component('prmSearchAfter', prmSearchAfterComponent);
