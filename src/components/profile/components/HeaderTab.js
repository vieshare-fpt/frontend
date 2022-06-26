import * as React from 'react';

import { Avatar, Button, WorkIcon, BeachAccessIcon, CardActions, CardContent, CardHeader, Container, Divider, ImageIcon, List, ListItem, ListItemAvatar, ListItemText, Typography, Modal, TextField, MenuItem } from '@mui/material';

export default function HeadersTab({ image, title, subTitle }) {
    return (
        <CardHeader
            avatar={image}
            title={title}
            titleTypographyProps={{ variant: 'h6' }}
            subheader={subTitle}
            sx={{ fontSize: '24px', borderBottom: 1, borderColor: 'grey.500' }}
        />
    )
}