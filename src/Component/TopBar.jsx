
import Menu from "./Menu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./TopBar.css"

function TopBar() {
  return (
    <>
    <div className="outer">
      <Box sx={{display:"flex",}}>
        <Box sx={{zIndex:100,display:"flex",gap:5,backgroundColor:"#e7ffc9ff",px:2,alignItems:"center",width:"29.55%",justifyContent:"center",border: (theme) => `2px solid ${theme.palette.divider}`}}>
          <Box sx={{display:"flex",gap:1}}>
            <Typography sx={{color:"black"}}>NIFTY 50</Typography>
            <Typography sx={{color:"red"}}>{100.2}</Typography>
          </Box>
          <Box sx={{display:"flex",gap:1,}}>
            <Typography sx={{color:"black"}}>SENSEX</Typography>
            <Typography sx={{color:"red"}}>{100.2}</Typography>
          </Box>
        </Box>
        <Box sx={{flex:1,backgroundColor:"#e7ffc9ff",borderBottom: (theme) => `2px solid ${theme.palette.divider}`}}>
          <Box ><Menu /></Box>
        </Box>
      </Box>
      </div>
      
    </>
  );
}

export default TopBar;
