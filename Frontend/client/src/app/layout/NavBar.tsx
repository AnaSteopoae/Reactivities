import { Group } from '@mui/icons-material'
import { Box, AppBar, Toolbar, Typography, Button, Container, LinearProgress } from '@mui/material'
import { NavLink } from 'react-router'
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';
import { useAccount } from '../../lib/hooks/useAccount';
import UserMenu from './UserMenu';


export default function NavBar() {
    const {uiStore} = useStore();
    const {currentUser} = useAccount();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)', position:"relative"}}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Button component={NavLink} to='/' sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'inherit', textDecoration: 'none' }}>
                                <Group fontSize="large" />
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Reactivities</Typography>
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
                                    <UserMenu/>
                                </Typography>
                            ): (
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

                <Observer>
                    {() => uiStore.isLoading ? (
                        <LinearProgress color="secondary" sx={{position:'absolute', bottom:0, left:0, right:0, height: 4 }} />
                    ) : null}
                </Observer>

            </AppBar>
        </Box>
    )
}