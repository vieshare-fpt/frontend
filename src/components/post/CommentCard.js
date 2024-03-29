import React from 'react'
import 'moment/locale/vi' 
import { Box, Avatar } from "@mui/material"
import { Paper, Grid } from "@mui/material"
import Moment from 'moment';


export function CommentCard({ data }) {
    const publishDate = Moment(data.publishDate).format('DD/MM/YYYY - h:mm a');
    
//   console.log(data);
    return (
        <Box 
        sx={{
            display: 'flex', 
            flexDirection: 'row', 
            marginBottom:1, 
            backgroundColor: 'none',

            // alignItems: 'center',
        }}>
            <Avatar alt={data.user.name} src={data.user.avatar}/>
            <Grid 
            style={{
                backgroundColor: 'rgba(255,255,255,0.75)', 
                marginLeft: 5,
                padding:10, 
                borderRadius:5,
                width: "100%",
            }} 
            className="commentCard"
            >

                <Grid style={{display: 'flex', borderBottom: "1px solid lightgray",}}>
                    <h4 style={{margin: 2, }}>{data.user.name}</h4>
                </Grid>
                <div style={{margin: 2, height: "auto"}} className="commentContent">{data.content}
                <p style={{fontSize: "small", color:"gray", marginBottom: 0,}}>{publishDate}</p>
                </div>

            </Grid>
        </Box>
    )
}


