import { FunnelChart } from 'react-funnel-pipeline';
import 'react-funnel-pipeline/dist/index.css';
import './Funnel.css'

function Funnel(props) {
   
    return (
        <FunnelChart 
          //showNames={false}
          data={props.funnelData}
          heightRelativeToValue={true}
          chartHeight={600}
          // style={{
          //   color: 'black', 
          //   fontSize: '2px'
          // }}
      />
    );
}

export default Funnel;