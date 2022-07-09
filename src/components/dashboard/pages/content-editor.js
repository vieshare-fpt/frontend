import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, TextField, Typography, Toolbar, Button, IconButton, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import CategorySelector from 'src/components/common/category-selector'
import { creatorApi } from 'src/services';
import { uploadImage } from 'src/utils/uploadImage';
import { useRouter } from "next/router";

import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import Image from 'next/image';

export default function ContentEditor(props) {
    const router = useRouter();
    const { quill, quillRef } = useQuill();

    React.useEffect(() => {
        console.log(props)
    })

    const { categories, initialPost } = props.props.props;
    const [title, setTitle] = React.useState(initialPost?.title || 'Bài viết mới');
    const [description, setDescription] = React.useState(initialPost?.description || 'Bài viết này về...');
    const [imagePath, setImagePath] = React.useState(initialPost?.thumbnail || null);
    const [category, setCategory] = React.useState(categories[0]);
    const [content, setContent] = React.useState(initialPost?.content || '<h1>Nội dung bài viết ở đây\n<h1><br/>');
    const [type, setType] = React.useState(initialPost?.type || "Free");

    const insertToEditor = (url) => {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', url);
    };

    const saveToServer = async (file) => {
        const body = new FormData();
        body.append('image', file);

        uploadImage(body, (result) => {
            let imageUrl = result.data.medium ? result.data.medium.url : result.data.image.url
            insertToEditor(imageUrl);
        }, (error) => {
            alert("Upload failed");
            console.error("Error:", error);
        })
    };

    const selectLocalImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            saveToServer(file);
        };
    };

    React.useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(content);
            quill.on('text-change', () => {
                setContent(quill.root.innerHTML); // Get innerHTML using quill
            });
            quill.getModule('toolbar').addHandler('image', selectLocalImage);
        }
    }, [quill]);

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, pl: 2, pr: 2, pb: 1, width: { sm: `100%` } }}
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
                    {initialPost ? "Sửa bài viết" : "Tạo bài viết"}
                </Typography>
                {initialPost ? <Button sx={{ float: 'right' }} onClick={async () => {
                    const categoryId = category.id
                    const result = await creatorApi.editPost({
                        id: initialPost.id,
                        title,
                        categoryId,
                        description,
                        content,
                        type,
                        thumbnail: imagePath ? imagePath : 'https://vieshare-stg.vi-vu.vn/default.jpg'
                    })
                    if (result.data.id) {
                        router.replace('/dashboard/my-contents')
                    } else {
                        if (result.statusCode === "INVALID_CREDENTIALS") {
                            return
                        }

                        alert("Đã có lỗi xảy ra khi chúng tôi lưu bài viết, chi tiết: " + result.message);
                    }
                    // TODO
                }}>Lưu bài viết</Button> : <>
                    <Button sx={{ float: 'right' }}>Phát hành</Button>
                    <Button sx={{ float: 'right' }} onClick={async () => {
                        const categoryId = category.id
                        const result = await creatorApi.createPost({
                            title,
                            categoryId,
                            description,
                            content,
                            type,
                            thumbnail: imagePath ? imagePath : 'https://vieshare-stg.vi-vu.vn/default.jpg'
                        })
                        if (result.data.id) {
                            router.replace('/dashboard/my-contents')
                        } else {
                            if (result.statusCode === "INVALID_CREDENTIALS") {
                                return
                            }

                            alert("Đã có lỗi xảy ra khi chúng tôi thử lưu bài viết, chi tiết: " + result.message);
                        }
                        // TODO
                    }}>Lưu bài viết</Button>
                </>}
            </Toolbar>
            <Typography sx={{ p: 1 }}>Tiêu đề bài viết</Typography>
            <TextField
                id={`title-input`}
                fullWidth
                multiline
                maxRows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Typography sx={{ p: 1 }}>Mô tả ngắn</Typography>
            <TextField
                id={`description-input`}
                fullWidth
                multiline
                maxRows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Typography sx={{ p: 1 }}>Ảnh bài viết</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', width: 160 }}>
                {imagePath && <Image width={160} height={80} src={imagePath}></Image>}
                <Button
                    sx={{ margin: 1 }}
                    variant="contained"
                    component="label"
                >
                    Tải lên ảnh
                    <input
                        type="file"
                        hidden
                        accept='image/*'
                        onChange={(event) => {
                            const file = event.target.files[0]
                            const body = new FormData();
                            body.append('image', file);

                            uploadImage(body, (result) => {
                                let imageUrl = result.data.thumb ? result.data.thumb.url : result.data.image.url
                                setImagePath(imageUrl)
                            }, (error) => {
                                alert("Upload failed");
                                console.error("Error:", error);
                            })
                        }}
                    />
                </Button>
            </div>

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
                <div ref={quillRef} />
            </div>
        </Box>
    );
}
