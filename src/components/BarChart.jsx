import { Bar } from 'react-chartjs-2';

function BarChart(props) {
    // const sales = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'A', 'B', 'C', 'D'];
    // const activePort = [12, 19, 3, 5, 2, 3, 4, 12, 1, 3];
    // const goal = [70, 50, 80, 20, 10, 15, 20, 15, 10, 4];
    const backgroundColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(247, 104, 247, 1)',
        'rgba(104, 233, 247, 1)',
        'rgba(35, 244, 108, 1)',
        'rgba(88, 70, 245, 1)'
    ];
    const borderColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(247, 104, 247, 0.2)',
        'rgba(104, 233, 247, 0.2)',
        'rgba(35, 244, 108, 0.2)',
        'rgba(88, 70, 245, 0.2)'
    ];

    return (
        <Bar 
            data={{
                labels: props.sales,
                datasets: [
                        {
                            label: '# of Active Port',
                            data: props.activePort,
                            backgroundColor: backgroundColor,
                            borderColor: borderColor,
                            borderWidth: 1
                        },
                        {
                            label: 'Avg. Goal',
                            data: props.goal,
                            backgroundColor: borderColor
                        }
                    ]
                }}
            // height={400}
            // width={600}
            options={{
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Ports By Sales Person',
                    fontSize: 20
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }}
        />
    );
}

export default BarChart;