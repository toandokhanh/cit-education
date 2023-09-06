import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BasicSpeedDial from './SpeedDial';
import { Link, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../../constant/constant';
import { useUser } from '../../Contexts/UserContext';

function Navbar() {
  const navigate = useNavigate();
  const { logoutUser } = useUser();
  const { user } = useUser();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleLogout = async () => await logoutUser()

  
  return (
      <>
          <AppBar  position="static"  >
            <Container maxWidth="xl" >
              <Toolbar disableGutters>
                <ApartmentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  CITED
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <MenuItem >
                      <Typography textAlign="center"><Link to={'/courses'}>Courses</Link></Typography>
                    </MenuItem>
                    <MenuItem >
                      <Typography textAlign="center"><Link to={'/roadmap'}>Roadmap</Link></Typography>
                    </MenuItem>
                    <MenuItem >
                      <Typography textAlign="center"><Link to={'/blog'}>Blog</Link></Typography>
                    </MenuItem>
                    <MenuItem >
                      <Typography textAlign="center"><Link to={'/about'}>About</Link></Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                <ApartmentIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  CITED
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {/* const pages = ['Courses', 'Roadmap', 'Blog', 'About']; */}
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                      <Link to={'/courses'}>Courses</Link>
                    </Button>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                      <Link to={'/roadmap'}>Roadmap</Link>
                    </Button>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                      <Link to={'/blog'}>Blog</Link>
                    </Button>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                      <Link to={'/about'}>About</Link>
                    </Button>
                </Box>
                {user ? (
                  <>
                    <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={user?.fullname} src='a'/>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                        <MenuItem >
                          <Typography textAlign="center"><Link to={'/me'}>Account</Link></Typography>
                        </MenuItem>
                        <MenuItem>
                          <Typography textAlign="center"><Link to={'/myCourses'}>My Courses</Link></Typography>
                        </MenuItem>
                        <MenuItem>
                          <Typography textAlign="center"><Link to={'/statistic'}>Statistic</Link></Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <Typography textAlign="center" >Logout</Typography>
                        </MenuItem>
                    </Menu>
                  </Box>
                  <BasicSpeedDial />
                </>
                ) : (
                   <div className='font-bold'>
                     <Link to='/login'>Login</Link>
                   </div>
                )
                }
              </Toolbar>
            </Container>
        </AppBar>
        
      </>
  );
}
export default Navbar;