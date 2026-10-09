import { Group } from '@mui/icons-material'
import { Box, AppBar, Toolbar, Typography, Button, Container, CircularProgress } from '@mui/material'
import { NavLink } from 'react-router'
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';
import { useAccount } from '../../lib/hooks/useAccount';
import UserMenu from './UserMenu';


export default function NavBar() {
    const { uiStore } = useStore();
    const { currentUser } = useAccount();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Button component={NavLink} to='/' sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'inherit', textDecoration: 'none' }}>
                                <Group fontSize="large" />
                                <Typography variant="h4" sx={{ fontWeight: 'bold', position: 'relative' }}>Reactivities</Typography>
                                <Observer>
                                    {() => uiStore.isLoading ? (
                                        <CircularProgress size={20} thickness={7} sx={{ color:'white', position:'absolute', top:'30%', left:'105%'}} />
                                    ) : null}
                                </Observer>
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Button component={NavLink} to='/activities' sx={{ color: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Activities
                            </Button>

                            <Button component={NavLink} to='/counter' sx={{ color: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Counter
                            </Button>
                            <Button component={NavLink} to='/errors' sx={{ color: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Errors
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {currentUser ? (
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    <UserMenu />
                                </Typography>
                            ) : (
                                <>
                                    <Button component={NavLink} to='/login' sx={{ color: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                        Login
                                    </Button>
                                    <Button component={NavLink} to='/register' sx={{ color: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                        Register
                                    </Button>

                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}