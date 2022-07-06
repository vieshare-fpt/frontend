import * as React from 'react';
import dynamic from 'next/dynamic'
import MenuIcon from '@mui/icons-material/Menu';
import { Box, TextField, Typography, Toolbar, Button, IconButton, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import CategorySelector from 'src/components/common/category-selector'
import { creatorApi } from 'src/services';

const Editor = dynamic(() => import("src/components/dashboard/editor"), {
    ssr: false
});

export default function ContentEditor(props) {
    let quillRef = React.useRef(null);
    const { categories, initialPost } = props.props.props;
    const [title, setTitle] = React.useState(initialPost?.title || 'Bài viết mới');
    const [description, setDescription] = React.useState(initialPost?.description || 'Bài viết này về...');
    const [category, setCategory] = React.useState(categories[0]);
    const [content, setContent] = React.useState(initialPost?.content || 'Nội dung bài viết ở đây');
    const [type, setType] = React.useState(initialPost?.type || "Free");

    const imageHandler = () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);

            const editor = quillRef.current.getEditor()
            const range = editor.getSelection(true);
            fetch(
                "https://api.imgbb.com/1/upload?key=3f27eab09a290dd1707c4f384a17668d",
                {
                    method: "POST",
                    body: formData
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    editor.insertEmbed(range.index, 'image', result.data.medium.url);
                })
                .catch((error) => {
                    editor.deleteText(range.index, 1);
                    alert("Upload failed");
                    console.error("Error:", error);
                });
        };
    }

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },

    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

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
                    const categoryId = category.id
                    const result = await creatorApi.createPost({
                        title,
                        categoryId,
                        description,
                        content,
                        type,
                        thumbnail: "https://i.ibb.co/njbD2sL/hello.png"
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
                    <FormControlLabel value="Free" control={<Radio />} label="Miễn Phí" />
                    <FormControlLabel value="Premium" control={<Radio />} label="Trả Phí" />
                </RadioGroup>
            </FormControl>
            <Typography sx={{ p: 1 }}>Nội dung</Typography>
            <div>
                <Editor editorRef={quillRef} value={content} modules={modules} formats={formats} onChange={setContent} />
            </div>
        </Box>
    );
}
