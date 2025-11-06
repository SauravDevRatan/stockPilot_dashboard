
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { useState,useEffect } from 'react';




ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughNut() {
    const [user, setUser] = useState(null);
    const [allHoldings,setAllHoldings]=useState([]);
    useEffect(() => {
  axios.get("http://localhost:8080/api/v1/users/holdingData",{withCredentials:true})
    .then((res) => { 
      setAllHoldings(res.data.holding);
      setUser(res.data)
    })
    .catch((err) => console.error("Error fetching holdings:", err));
}, []);


    const labels=allHoldings.map((e)=>{return e.name});
    const price=allHoldings.map((e)=>{return e.price*e.qty});

    const backgroundColors = labels.map(
    () =>
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
    );
    const borderColors = backgroundColors.map((color) =>
        color.replace("0.5", "1")
    );

    const data = {
    labels,
    datasets: [
      {
        label: `Total amount in (₹)`,
        data: price,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
    };

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <Doughnut data={data} />
    </div>
  );
}