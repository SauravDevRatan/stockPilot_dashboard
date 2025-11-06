import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { watchlist } from "../data/data";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";



function WatchList({onStockSelect}) {


  return (
    <Box
      sx={{
        width: "100%",
        height:"240vh",
        p: 2,
        borderRight: (theme) => `2px solid ${theme.palette.divider}`
      }}
    >
        
      <Box component="form"  sx={{position:"inherit",width: "100%", display: "flex", alignItems: "center", 
        justifyContent: "space-between", }} noValidate autoComplete="off">
        
        <TextField
          id="outlined-basic"
          placeholder="Search eg: ONGC,INFY,TCS,etc"
          variant="outlined"
          fullWidth
          size="small"
        />
        <Typography
          variant="h6"
          sx={{ textWrap: "nowrap",ml:1,color:"text.secondary"}}
        >
          {watchlist.length} / <b>50</b>
        </Typography>
      </Box>
      
      <Box
       sx={{
        maxHeight: "200vh",
        overflowY: "auto",
        overflowX: "hidden", }}
        
      >
        {watchlist.map((e, i) => {
        return (
            <WatchListitems stock={e} key={i} onStockSelect={onStockSelect}/>
        );
        })}
        </Box>
    </Box>
  );
}

export default WatchList;

const WatchListitems=({stock,onStockSelect})=>{
    const [showWatchlistActions, setShowWatchlistActions] = useState(false);

    const handleMouseEnter = (e) => {
        setShowWatchlistActions(true);
        
    };

    const handleMouseLeave = (e) => {
        setShowWatchlistActions(false);
    };
    return(
        <>
        <Typography
            
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                cursor: "pointer",
                position:"inherit",
                color:
                stock.isDown
                    ? "red"
                    : "green",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
                backgroundColor:showWatchlistActions?"rgba(240, 237, 237, 1)":"inherit",
                p:2
                
            }}
            >
            <span>{stock.name}</span>
            
            <span style={{display: "flex",
                justifyContent: "space-between",
                alignItems: "center",gap:"1rem"}}>
                    {showWatchlistActions ? (
                        <HoverElement uid={stock.name} price={stock.price}  onStockSelect={onStockSelect}/>
                    ) : (
                        <>
                        {stock.percent}
                        {stock.isDown ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                        </>
                    )}
                {stock.price.toFixed(2)}
            </span>
            </Typography>
        </>
    )
}

const HoverElement=({uid,price,onStockSelect})=>{

  let[popup,setPopup]=useState(false);

  function popUpflasherBuy(){
    setPopup(!popup);
    onStockSelect({uid,price,type:"buy"});
  }
  function popUpflasherSell(){
    setPopup(!popup);
    onStockSelect({uid,price,type:"sell"});
  }


    return(
        <>
        <Tooltip title="Buy" arrow >
            <Button size="small" onClick={popUpflasherBuy} sx={{backgroundColor:"green",color:"whitesmoke"}}>B</Button>
        </Tooltip>
        <Tooltip title="Sell" arrow >
            <Button size="small" onClick={popUpflasherSell} sx={{backgroundColor:"red",color:"whitesmoke"}}>S</Button>
        </Tooltip>
        </>
    );
}



