import {AppBar, Box, Container, Toolbar, Typography, Button} from "@mui/material";
import {Link, useNavigate} from 'react-router-dom';

export const Navbar = () => {

  const navigate = useNavigate();

  return (
    <Box className="box" sx={{flexGrow:1}}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{flexGrow:1}}>
                <Link to='/'>PERN Stack</Link>                
            </Typography>

            <Button variant="contained" color="primary" onClick={()=>navigate('/tasks/new')}>New Task</Button>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
