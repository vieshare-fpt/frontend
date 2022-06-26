import * as React from 'react';;
import { Avatar,  Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export default function ItemTab({ icon, name, value, divider }) {
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {icon}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={value} />
            </ListItem>
            {divider ? <Divider component="li" /> : <></>}

        </>
    );
}
