import React, { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";
import Card from "./components/Card";
import Funnel from "./components/Funnel";



interface IDeal {
  salesPerson: string;
  siteWalkPorts: number;
  proposalPorts: number;
  fundingPorts: number;
}


function App() {
  // Properties
  const [sales, setSales] = useState<string[]>([]);
  const [fundingPorts, setFundingPorts] = useState<number[]>([]);
  const [goalPorts, setGoalPorts] = useState<number>(Number(localStorage.getItem('goalPortsInLocalStorage')) || 200);
  const [totalFundingPortsAndRemainingPorts, setTotalFundingPortsAndRemainingPorts] = useState<[number, number]>([0, 0]);
  const [funnelData, setFunnelData] = useState<number[]>([]);
  const [averageGoalPorts, setAverageGoalPorts] = useState<number[]>([]);


  // onClick handler function and save the value in local storage
  function addGoal(): void {
    const temp: number =  goalPorts + 50;
    setGoalPorts(temp);
    localStorage.setItem('goalPortsInLocalStorage', temp.toString());
  }

  function subGoal(): void {
    if (goalPorts >= 50) {
      const temp: number =  goalPorts - 50;
      setGoalPorts(temp);
      localStorage.setItem('goalPortsInLocalStorage', temp.toString());
    }
  }

  useEffect(() => {
    const loadSales = async (): Promise<IDeal[]> => {
      // Fetching data from backend api
      // const res = await (
      //   await fetch('https://dev-api.livingstonenergygroup.com/bitrix-api/retrieve-sales-by-person')
      // ).json();

      // return res.data as IDeal[];

      return [
        {
          salesPerson: "Sami Hammer",
          siteWalkPorts: 200,
          proposalPorts: 45,
          fundingPorts: 35,
        },
        {
          salesPerson: "Amanda Lenord",
          siteWalkPorts: 125,
          proposalPorts: 45,
          fundingPorts: 20,
        },
        {
          salesPerson: "Steve Coons",
          siteWalkPorts: 50,
          proposalPorts: 100,
          fundingPorts: 10,
        },
      ];
    };

    const reducer = (accumulator: number, currentValue: number) =>
      accumulator + currentValue;

    // Temporary properties
    const salesTemp: string[] = [];
    const fundingPortsTemp: number[] = [];
    const averageGoalPortsTemp: number[] = [];

    let totalFundingPorts: number = 0;
    let totalSiteWalkPorts: number = 0;
    let totalProposalPorts: number = 0;
    
    // Processing data
    loadSales().then((deals) => {
      deals.forEach((deal) => {
        salesTemp.push(deal.salesPerson); // Getting each of sales
        fundingPortsTemp.push(deal.fundingPorts); // Getting funding ports from each sales
        totalSiteWalkPorts = totalSiteWalkPorts + deal.siteWalkPorts; // Total number of site walk ports
        totalProposalPorts = totalProposalPorts + deal.proposalPorts; // Total number of proposal ports
      });

      setSales(salesTemp);
      setFundingPorts(fundingPortsTemp);

      totalFundingPorts = fundingPortsTemp.reduce(reducer); // Total number of funding ports
      setTotalFundingPortsAndRemainingPorts([totalFundingPorts, goalPorts - totalFundingPorts]);

      // Average goal ports by person
      for (let i = 0; i < fundingPorts.length; i++) {
        averageGoalPortsTemp.push(Math.floor(goalPorts / fundingPorts.length));
      }
      setAverageGoalPorts(averageGoalPortsTemp);

      // Funnel data
      const funnelDataTemp: number[] = [
        totalSiteWalkPorts + totalProposalPorts + totalFundingPorts,
        totalProposalPorts + totalFundingPorts,
        totalFundingPorts,
      ];
      setFunnelData(funnelDataTemp);
    });

  }, [fundingPorts.length, goalPorts]);

  return (
    <div className="main">
      <div className="nav">
        <img
          src="https://static.wixstatic.com/media/32ee6e_e93acb3455d4409294d442b56439137c~mv2.png/v1/fill/w_626,h_200,al_c,q_85,usm_0.66_1.00_0.01/LE%20LOGO2019%20TRANS.webp"
          alt="logo"
        />
        <span>Sales Dashboard</span>
      </div>

      <div>
        <div className="main-chart">
          <div>
            <div className="sales-chart">
              <BarChart
                sales={sales}
                activePort={fundingPorts}
                goal={averageGoalPorts}
              />
            </div>
            <div className="goal">
              <div className="doughnut">
                <DoughnutChart ports={totalFundingPortsAndRemainingPorts} />
              </div>
              <div className="goal-card">
                <Card
                  totalFundingPortsAndRemainingPorts={totalFundingPortsAndRemainingPorts[0]}
                  goal={goalPorts}
                  remaining={totalFundingPortsAndRemainingPorts[1]}
                  addGoal={addGoal}
                  subGoal={subGoal}
                />
              </div>
            </div>
          </div>

          <div className="funnel">
            <Funnel funnelData={funnelData} /> 
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
