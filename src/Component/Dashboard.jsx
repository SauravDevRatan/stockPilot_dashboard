import {useState} from "react";
import { Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import Profile from "./profile";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Summary from "./Summary";
import WatchList from "./WatchList";
import ActionWindow from "./BuyActionWindow";
import Errorpage from "../Error";
import EditPassword from "./editpasswordPage";
import EditProfile from "./editDetails";


function Dashboard() {
  const [selectedStock, setSelectedStock] = useState(null);

  function toggler(){
    setSelectedStock(null);
  }

  return (
    <>
    <Box sx={{display:"flex",flexDirection:"row"}}>
    <Box sx={{display:"flex",width:"31.75%",height:"120vh",}}>
        <WatchList onStockSelect={setSelectedStock}/>
    </Box>
    <Box sx={{flex:1,px:2,width:"30%",height:"100vh",justifyContent:"center"}}>
        <Routes>
          
          <Route path="/summary" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editPassword" element={<EditPassword />} />
          <Route path="/editDetails" element={<EditProfile />} />
          <Route path="/*" element={<Errorpage />} />
        </Routes>
        {selectedStock && (
            <ActionWindow
              name={selectedStock.uid}
              price={selectedStock.price}
              type={selectedStock.type} 
              toggler={toggler}
            />
          )}
    </Box>
    </Box>
    
    </>
  );
};

export default Dashboard;
