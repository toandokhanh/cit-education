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
import { useUser } from '../Contexts/UserContext';
import { HTTP_URL_SERVER_NEST } from '../../constant/constant';

function Navbar({courses, setCourses }: any) {
  const navigate = useNavigate()
  const { logoutUser } = useUser();
  const { user } = useUser();
  console.log('dasadasdasds',user);
  
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
  
  const handleLogout = async () => {
    await logoutUser()
    navigate('/home');
  }

  
  return (
      <>
          <AppBar  position="static"  >
            <Container maxWidth="xl" >
              <Toolbar disableGutters>
                <ApartmentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Link to='/'>
                  <Typography
                    variant="h6"
                    noWrap
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
                </Link>

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
                    {!user?.isInstructor ? (
                      <div>
                      <MenuItem >
                        <Typography textAlign="center"><Link to={'/courses'}>Courses</Link></Typography>
                      </MenuItem>
                      <MenuItem >
                        <Typography textAlign="center"><Link to={'/roadmap'}>Roadmap</Link></Typography>
                      </MenuItem>
                      </div>
                    ): null}
                    
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
                    {!user?.isInstructor ? (
                      <>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                          <Link to={'/courses'}>Courses</Link>
                        </Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                          <Link to={'/roadmap'}>Roadmap</Link>
                        </Button>
                      </>
                    ): null}
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                      <Link to={'/blog'}>Blog</Link>
                    </Button>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                      <Link to={'/about'}>About</Link>
                    </Button>
                </Box>
                <div className="mr-8 relative">
                {user?.isInstructor && (
                    <><BasicSpeedDial courses={courses} setCourses={setCourses}/></>
                  )}
                </div>
                <div className="mr-8 relative">
                  <input
                    type="text"
                    placeholder=" Search courses"
                    className="py-[6px] px-6 bg-gray-200 text-gray-800 rounded-full pl-8 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <div className="absolute left-2 top-2">
                    <i className="material-icons text-gray-500">search</i>
                  </div>
                </div>
                {user ? (
                  <>
                    <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={user?.fullname} src={`${HTTP_URL_SERVER_NEST}${user?.avatar}` || `/static/images/avatar/1.jpg`}/>
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
                        <Link to={`/user/${user?.email?.split('@')[0]}`}>
                        <MenuItem >
                          <Typography textAlign="center">Account</Typography>
                        </MenuItem>
                        </Link> 
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
                  
                </>
                ) : (
                   <div className='font-bold '>
                     <Link className='mx-5' to='/login'>Sign in</Link>
                     <button className="bg-[#1976d2] hover:text-[#ebebeb] hover:border-[#ebebeb] text-[while] font-semibold py-2 px-4 border border-[while] rounded shadow">
                     <Link to='/register'>Sign up</Link>
                    </button>
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