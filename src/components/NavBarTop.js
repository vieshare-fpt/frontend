import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { InputAdornment, styled, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import Link from 'next/link';
import UserPopup from 'src/components/UserPopup';
import NavLine from 'src/components/AppBar/NavLine';
import NavMenu from 'src/components/AppBar/NavMenu';
import Access from 'src/components/Access.js';
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
    },
    '@media(minWidth: 1260px)':{

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


const NavBarTop = () => {
  const user = useSelector((state) => state.user.currentUserInfoLimit.userInfo?.jwtPayload);

  const [searchValue, setSearchValue] = React.useState('');



  return (
    <div>
      <AppBar position="fixed" elevation={0} sx={{ backgroundColor: 'white' }}>
        <Toolbar disableGutters>
          {/* this is logo */}
          <MyLogo
            sx={{ display: { xs: 'none', md: 'none', lg: 'flex' } }}>
            <Link href='/'>
              VieShare
            </Link>
          </MyLogo>
          {/* this is icon and menu button  */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'center', lg: 'none' } }}>
            <NavMenu />
          </Box>
          {/* This is search box */}
          <Box sx={{ m: 1, flexGrow: 1 }} >
            <form noValidate autoComplete="off" >
              <MyTextField
                id="searchContent"
                size='small'
                label='Tìm kiếm'
                sx={{ 
                  width: { lg: '50ch', md: 'none', xs: '25ch' }, 
                  backgroundColor: '#f5f5f5', 
                  borderRadius: '12px',
                }}
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
          <Box sx={{ flexGrow: 0, display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex-end' } }}>
            <NavLine />
          </Box>
          {/* this is userPopup  when was login */}
          {!user ? (
            <>
              <Access />
            </>
            
          ) : (
            <>
              <Box sx={{ margin: '0'}}>
                <UserPopup type={user.isPremium} fullname={user.name} avatar={user.avatar} email={user.email}/>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar >
    </div>
  );
};
export default NavBarTop;
