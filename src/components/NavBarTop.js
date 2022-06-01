import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { InputAdornment, styled, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import Link from 'next/link';
import { default as LinkMUI } from '@mui/material/Link';
import UserPopup from './UserPopup';
import NavLine from './AppBar/NavLine';
import NavMenu from './AppBar/NavMenu';
import Access from './Access.js';
import { useSelector } from 'react-redux';



const MyTextField = styled(TextField)(
  {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'green',
      },
      '&:hover fieldset': {
        borderColor: 'green',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
    ['& fieldset']: {
      borderRadius: 12
    }
  }
)
const MyLogo = styled(Typography)({
  color: "#2E7D32",
  fontFamily: 'Salsa',
  fontSize: '36px',
  fontWeight: '400',
  lineHeight: '44px',
  letterSpacing: '0em',
  textAlign: 'left',
  marginLeft: 20,


});
const MyLink = styled(LinkMUI)((theme) => ({
  '&:hover': {
    color: 'green !important',
  }
}))

const NavBarTop = () => {
  const user = useSelector((state) => state.user.currentUser.userInfo);

  const [searchValue, setSearchValue] = React.useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white' }}>
        <Toolbar disableGutters>
          {/* this is logo */}
          <MyLogo
            sx={{ display: { xs: 'none', md: 'none', lg: 'flex' } }}>
            <Link href='/'>
              VieShare
            </Link>
          </MyLogo>
          {/* this is icon and menu button  */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
            <NavMenu />
          </Box>
          {/* This is search box */}
          <Box sx={{ m: 2, flexGrow: 1 }} >
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <MyTextField
                id="searchContent"
                size='small'
                label='Tìm kiếm'
                sx={{ width: { lg: '60ch', md: 'none', xs: '30ch' }, backgroundColor: '#f5f5f5', borderRadius: '12px' }}
                value={searchValue}
                color="success"
                onInput={e => setSearchValue(e.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                }}
              />

            </form>
          </Box>
          <Box sx={{ flexGrow: { xs: '0', md: '1', lg: '1' } }} />
          {/* this is navigation */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'none', lg: 'flex' } }}>
            <NavLine />
          </Box>
          {/* this is userPopup  when was login */}
          {user ? (
            <>
              <Box>
                <UserPopup type={user.data.isPremium} fullname={user.data.name} avatar={user.data.avatar} email={user.data.email}/>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Access />
              </Box>
            </>
          )}



        </Toolbar>
      </AppBar >
    </div>
  );
};
export default NavBarTop;
