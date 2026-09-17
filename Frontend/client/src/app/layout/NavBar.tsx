import { Group } from '@mui/icons-material'
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { NavLink } from 'react-router'


export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}>
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
                        </Box>
                        <Button >
                            User menu
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}