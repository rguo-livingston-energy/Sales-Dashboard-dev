import React, { useState, useEffect } from 'react';
import './App.css';
import BarChart from './components/BarChart';
import DoughnutChart from './components/DoughnutChart';
import Card from './components/Card';


interface IDeal {
  salesPerson: string;
  numPorts: number;
}


function App() {
  const [sales, setSales] = useState<string[]>([]);
  const [numPorts, setNumPorts] = useState<number[]>([]);
  const [goalPorts, setGoalPorts] = useState<number>(200);
  const [totalPorts, setTotalPorts] = useState<number>(0);

  useEffect(() => {
    const loadSales = async (): Promise<IDeal[]> => {
      // const res = await (
      //   await fetch('https://dev-api.livingstonenergygroup.com/bitrix-api/retrieve-sales-by-person')
      // ).json();

      // return res.data as IDeal[];

      return [
        { salesPerson: 'Sami Hammer', numPorts: 50 },
        { salesPerson: 'Amanda Lenord', numPorts: 30 },
        { salesPerson: 'Steve Coons', numPorts: 40 },
      ];
    };

    const salesTemp:string[] = [];
    const numPortsTemp: number[] = [];
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;

    loadSales().then((deals) => {
      
      deals.forEach((deal) => {
        salesTemp.push(deal.salesPerson);
        numPortsTemp.push(deal.numPorts);
      });

      setSales(salesTemp);
      setNumPorts(numPortsTemp);
     
    });
   
  }, []);

  return (
    <div className="main">
      <div className="nav">
        <img src="https://static.wixstatic.com/media/32ee6e_e93acb3455d4409294d442b56439137c~mv2.png/v1/fill/w_626,h_200,al_c,q_85,usm_0.66_1.00_0.01/LE%20LOGO2019%20TRANS.webp" alt="logo"/>
        <span>Sales Dashboard</span>
      </div>
      <div className="sales-chart">
        <BarChart sales={sales} activePort={numPorts} />
      </div>
      <div className="goal">
        <div className="doughnut">
          <DoughnutChart />
        </div>
        <div className="card">
          <Card />
        </div>
      </div>
    </div>

  );
}

export default App;
