import React, { useState, useEffect } from 'react';
import './App.css';
import BarChart from './components/BarChart';
import DoughnutChart from './components/DoughnutChart';
import Card from './components/Card';
import Funnel from './components/Funnel';


interface IDeal {
  salesPerson: string;
  siteWalkPorts: number;
  proposalPorts: number;
  fundingPorts: number;
}

interface IFunnelData {
  name: String;
  value: number;
}


function App() {
  const [sales, setSales] = useState<string[]>([]);
  const [fundingPorts, setFundingPorts] = useState<number[]>([]);
  const [goalPorts, setGoalPorts] = useState<number>(200);
  const [totalPorts, setTotalPorts] = useState<[number, number]>([0, 0]);
  const [funnelData, setFunnelData] = useState<IFunnelData[]>([]);
  
  

  function addGoal():void {
    setGoalPorts(goalPorts + 50);
  }

  function subGoal():void {
    if (goalPorts >= 50) {
      setGoalPorts(goalPorts - 50);
    } 
  }

  useEffect(() => {
    const loadSales = async (): Promise<IDeal[]> => {
      // const res = await (
      //   await fetch('https://dev-api.livingstonenergygroup.com/bitrix-api/retrieve-sales-by-person')
      // ).json();

      // return res.data as IDeal[];

      return [
        { "salesPerson": "Sami Hammer", "siteWalkPorts": 100, "proposalPorts": 65, "fundingPorts": 35 },
        { "salesPerson": "Amanda Lenord", "siteWalkPorts": 20, "proposalPorts": 50, "fundingPorts": 100 },
        { "salesPerson": "Steve Coons", "siteWalkPorts": 250, "proposalPorts": 100, "fundingPorts": 60 }
      ];
    };

    const salesTemp:string[] = [];
    const fundingPortsTemp: number[] = [];
    
    let totalFundingPorts: number = 0;
    let totalSiteWalkPorts: number = 0;
    let totalProposalPorts: number = 0;

    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;

    loadSales().then((deals) => {
      
      deals.forEach((deal) => {
        salesTemp.push(deal.salesPerson);
        fundingPortsTemp.push(deal.fundingPorts);
        totalSiteWalkPorts = totalSiteWalkPorts + deal.siteWalkPorts;
        totalProposalPorts = totalProposalPorts + deal.proposalPorts;
      });

      setSales(salesTemp);
      setFundingPorts(fundingPortsTemp);
      totalFundingPorts = fundingPortsTemp.reduce(reducer);
      setTotalPorts([totalFundingPorts, goalPorts - totalFundingPorts]);

      const funnelDataTemp: IFunnelData[] = [ 
        { name: 'Site walk', value: totalSiteWalkPorts },
        { name: 'Proposal', value: totalProposalPorts },
        { name: 'Funding', value: totalFundingPorts } 
      ];

      setFunnelData(funnelDataTemp);

    });
   
  }, [goalPorts]);

  return (
    <div className="main">
    
      <div className="nav">
        <img src="https://static.wixstatic.com/media/32ee6e_e93acb3455d4409294d442b56439137c~mv2.png/v1/fill/w_626,h_200,al_c,q_85,usm_0.66_1.00_0.01/LE%20LOGO2019%20TRANS.webp" alt="logo"/>
        <span>Sales Dashboard</span>
      </div>
    

      <div>
        <div className="main-chart">
          <div className="sales-chart">
            <BarChart sales={sales} activePort={fundingPorts} />
          </div>
          <div className="funnel">
            <h4>Stage</h4>
            <Funnel funnelData={funnelData} />
          </div> 
        </div> 
      </div>
       
      <div className="goal">
        <div className="doughnut">
          <DoughnutChart ports={totalPorts} />
        </div>
        <div className="goal-card">
          <Card totalPorts={totalPorts[0]} goal={goalPorts} remaining={totalPorts[1]} addGoal={addGoal} subGoal={subGoal} />
        </div>
      </div>
    </div>

  );
}

export default App;
