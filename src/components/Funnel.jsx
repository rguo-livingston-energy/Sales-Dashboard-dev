import React, { useEffect } from 'react';
import FunnelGraph from "funnel-graph-js";
import "funnel-graph-js/dist/css/main.css";
import "funnel-graph-js/dist/css/theme.css";
import './Funnel.css'

function Funnel(props) {
  
  var dataExample3 = {
    labels: ['Site Walk Stage', 'Proposal Stage', 'Funding Stage'],
    //subLabels: ['Direct', 'Social Media', 'Ads'],
    colors: ['#7795FF', '#A0F9FF', '#C4C4C4'],
    values: props.funnelData
};

var graph = new FunnelGraph({
    container: '.fun',
    gradientDirection: 'vertical',
    data: dataExample3,
    displayPercent: true,
    direction: 'vertical',
    subLabelValue: 'raw'
});
    useEffect(() => {
      document.getElementById("fun").innerHTML = ""; // Clear all elements in the #fun <div> before draw a new SVG.
      graph.draw()
    },[props.funnelData]);

    return (
      <div className="fun" id="fun" ></div>
    );
}

export default Funnel;