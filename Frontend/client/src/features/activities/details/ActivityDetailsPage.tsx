import { Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import ActivityDetailsChat from "./ActivityDetailsChat";


export default function ActivityDetailsPage() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {activities, isLoadingActivity} = useActivities(id ?? "");
  const activity = activities?.find(activity => activity.id === id);

  if(isLoadingActivity) return <Typography>Loading...</Typography>
  if(!activity) return <Typography>Activity not found </Typography>

  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ActivityDetailsHeader activity = {activity}/>
        <ActivityDetailsInfo activity = {activity}/>
        <ActivityDetailsChat />
      </Grid>
      <Grid size={4}>
        <ActivityDetailsSidebar />
      </Grid>
    </Grid>
  )
}
