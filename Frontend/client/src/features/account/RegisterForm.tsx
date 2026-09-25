import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";


export default function RegisterForm() {
    const { registerUser } = useAccount();
    const { control, handleSubmit, setError, formState: { isValid, isSubmitting } } = useForm<RegisterSchema>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)){
                    error.forEach(err => {
                        if(err.includes('Email')) setError('email', {message: err});
                        else if(err.includes('Password')) setError('password', {message: err});
                    })
                }
            }
        });

    }

    return (
        <Paper component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3, maxWidth: 'md', borderRadius: 3, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, color: 'secondary.main' }}>
                <LockOpen fontSize="large" />
                <Typography variant="h4">Register</Typography>
            </Box>
            <TextInput label='Email' name='email' control={control} type='email' />
            <TextInput label='Display name' name='displayName' control={control} type='text' />
            <TextInput label='Password' name='password' control={control} type='password' />
            <Button type="submit" disabled={!isValid || isSubmitting} variant="contained" size="large">Register</Button>

            <Typography sx={{ textAlign: 'center' }}>
                Already have an account?
                <Typography component={Link} to='/login' color='primary' sx={{ ml: 2 }}>
                    Log In
                </Typography>
            </Typography>

        </Paper>
    )
}