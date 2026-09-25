import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";


export default function LoginForm() {
    const {loginUser} = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const {control, handleSubmit, formState: {isValid}} = useForm<LoginSchema>({
        mode: "onTouched",
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities');
            }
        });

    }

  return (
    <Paper component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display:'flex', flexDirection: 'column', gap: 3, p: 3, maxWidth: 'md', borderRadius: 3, mx: 'auto' }}>
        <Box sx={{ display:'flex', alignItems: 'center', justifyContent: 'center', gap: 3, color:'secondary.main' }}>
            <LockOpen fontSize="large"/>
            <Typography variant="h4">Log In</Typography>
        </Box>
        <TextInput label='Email' name='email' control={control} type='email' />
        <TextInput label='Password' name='password' control={control} type='password'/>
        <Button type="submit" disabled={!isValid} variant="contained" size="large">Log In</Button>

        <Typography sx={{textAlign:'center'}}>
            Don't have an account?
            <Typography component={Link} to='/register' color='primary' sx={{ml:2}}>
                Sign Up
            </Typography>
        </Typography>
        
    </Paper>
  )
}