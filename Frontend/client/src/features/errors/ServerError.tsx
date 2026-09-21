import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
    const {state} = useLocation();
  return (
    <Paper>
        {state.error ? (
            <>
            <Typography variant="h3" gutterBottom sx={{px: 4, pt:2, color:"secondary"}}>{state.error.message || 'An error occurred'}</Typography>
            <Divider />
            <Typography variant="body1" sx={{p: 4}}>
                {state.error.details || 'An unexpected error occurred. Please try again later.'}
            </Typography>
            </>
        ):(
            <Typography variant="h5" gutterBottom sx={{px: 4, pt:2, color:"secondary"}}>Server error</Typography>
        )}
    </Paper>
  )
}
