import { Grid } from "@mui/material";
import ReactLoading from 'react-loading';

export default function Loader() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >

            <Grid item xs={3}>
                <ReactLoading type="bubbles" color="#000" />
            </Grid>

        </Grid>
    )

}