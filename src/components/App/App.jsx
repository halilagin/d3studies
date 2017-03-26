import React, {Component} from 'react';

import {MyHist} from "../d3tut/MyHist"
import {ProgHist} from "../d3tut/ProgHist"
import {ProgHistControlPanel} from "../d3tut/ProgHistControlPanel"



class App extends Component {

    render() {
        return (
            <div>
                <div><h2>Progressive Histogram</h2><ProgHist name="dummyname"></ProgHist></div>
                {/*<ProgHistControlPanel></ProgHistControlPanel>*/}
            </div>

        );
    }

}


export default App;
