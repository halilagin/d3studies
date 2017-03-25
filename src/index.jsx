import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.decapitalize = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

ReactDom.render(
    <App />,
    document.querySelectorAll('.h1bgraph')[0]
);