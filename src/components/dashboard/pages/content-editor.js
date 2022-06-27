import * as React from 'react';
import dynamic from 'next/dynamic'
import MenuIcon from '@mui/icons-material/Menu';
import { Box, TextField, Typography, Toolbar, Button, IconButton, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import CategorySelector from 'src/components/common/category-selector'
import { creatorApi } from 'src/services';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function ContentEditor(props) {
    const { categories } = props.props.props;
    const [title, setTitle] = React.useState('Bài viết mới');
    const [description, setDescription] = React.useState('Bài viết này về...');
    const [category, setCategory] = React.useState(categories[0]);
    const [content, setContent] = React.useState('Nội dung bài viết ở đây');
    const [type, setType] = React.useState("FREE");

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, pl: 1, pr: 1, pb: 1, width: { sm: `100%` } }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Tạo bài viết
                </Typography>
                <Button sx={{ float: 'right' }}>Phát hành</Button>
                <Button sx={{ float: 'right' }} onClick={async () => {
                    const result = await creatorApi.createPost({
                        title,
                        "categoryId": category.id,
                        description,
                        content,
                        type: type.type,
                    })
                    // TODO
                }}>Lưu bài viết</Button>
            </Toolbar>
            <Typography sx={{ p: 1 }}>Tiêu đề bài viết</Typography>
            <TextField
                fullWidth
                multiline
                maxRows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Typography sx={{ p: 1 }}>Mô tả ngắn</Typography>
            <TextField
                fullWidth
                multiline
                maxRows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Typography sx={{ p: 1 }}>Chủ đề bài viết</Typography>
            <CategorySelector value={category} categories={categories} onSelect={(e) => {
                setCategory(categories.find(c => c.name = e.target.value))
            }} />
            <Typography sx={{ p: 1 }}>Loại bài viết</Typography>
            <FormControl>
                <RadioGroup
                    onChange={(e) => setType(e.target.value)}
                    row
                    value={type}
                    aria-labelledby="radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="FREE" control={<Radio />} label="Miễn Phí" />
                    <FormControlLabel value="PREMIUM" control={<Radio />} label="Trả Phí" />
                </RadioGroup>
            </FormControl>
            <Typography sx={{ p: 1 }}>Nội dung</Typography>
            <div>
                <ReactQuill value={content} onChange={setContent} />
            </div>
        </Box>
    );
}
