import { Stack, Chip } from '@mui/material';

export default function CategorySelector(props) {
    const { onClick, currentCategory, categories } = props
    return (
        <Stack direction="row" sx={{marginBottom: 2}} spacing={1}>
            {
                categories.map((category => {
                    return (
                        <Chip key={category.id} label={category.name} variant={currentCategory === category ? "filled": "outlined"} onClick={() => onClick(category)}/>
                    )
                }))
            }
      </Stack>
    );
}