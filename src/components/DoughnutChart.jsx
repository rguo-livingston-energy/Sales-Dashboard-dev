import { Doughnut } from 'react-chartjs-2';
import "chartjs-plugin-datalabels";

function DoughnutChart(props) {
    const portsName = ['In-progress', 'Remaining'];
    const ports = [120, 80];
   
    const backgroundColor = [
        'rgba(73, 163, 253, 1)',
        'rgba(196, 196, 196, 1)',
    ];

    return (
        <Doughnut 
            data={{
                labels: portsName,
                pieceLabel: {
                    render: 'value'
                },
                datasets: [
                        {
                            data: ports,
                            backgroundColor: backgroundColor,
                        }
                    ]
                }}
            // height={200}
            // width={200}
            options={{
                title: {
                    display: false,
                    text: 'Progress VS. Goal',
                    fontSize: 20
                },
                legend: {
                    display: false
                },
            }}

        />
    );
}

export default DoughnutChart;