import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
    activity: Activity;
    closeForm: () => void;
    submitForm: (activity: Activity) => void;
}

export default function ActivityForm({activity, closeForm, submitForm}: Props) {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        console.log(event);
        const formDate = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};
        formDate.forEach((value, key) => {
            data[key] = value;
        });
        if(activity) data.id = activity.id;
        
       submitForm(data as unknown as Activity);
    }

    return (
        <Paper sx={{ border: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">Create activity</Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField name="title" label='Title' defaultValue={activity?.title} />
                <TextField name="date" label='Date' type="date" defaultValue={activity?.date}/>
                <TextField name="description" label='Description' defaultValue={activity?.description} multiline rows={3}/>
                <TextField name="city" label='City' defaultValue={activity?.city} />
                <TextField name="venue" label='Venue' defaultValue={activity?.venue} />
                <TextField name="category" label='Category' defaultValue={activity?.category} />
                <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }} >
                    <Button onClick={closeForm} color="inherit">Cancel</Button>
                    <Button type="submit" color="success" variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}
