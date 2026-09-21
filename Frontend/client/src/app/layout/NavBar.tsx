import { Group } from '@mui/icons-material'
import { Box, AppBar, Toolbar, Typography, Button, Container, LinearProgress } from '@mui/material'
import { NavLink } from 'react-router'
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';


export default function NavBar() {
    const {uiStore} = useStore();

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
                            <Button component={NavLink} to='/createActivity' sx={{ color: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Create Activity
                            </Button>
                            <Button component={NavLink} to='/counter' sx={{ color: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Counter
                            </Button>
                            <Button component={NavLink} to='/errors' sx={{ color: 'inherit', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Errors
                            </Button>
                        </Box>
                        <Button >
                            User menu
                        </Button>
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