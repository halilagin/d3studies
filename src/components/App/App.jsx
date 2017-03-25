import React, {Component} from 'react';

import {MyHist} from "../d3tut/MyHist"
import {ProgHist} from "../d3tut/ProgHist"


class App extends Component {

    render() {
        return (
            <div>
                {/*<div><p>this is the upper paragraph!</p><MyHist name="dummyname"></MyHist></div>*/}
                <div><h2>Progressive Histogram</h2><ProgHist name="dummyname"></ProgHist></div>
            </div>

        );
    }

}


export default App;
