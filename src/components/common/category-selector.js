import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CategorySelector(props) {
    const { categories, onSelect, value } = props
  return (
    <Autocomplete
      id="category-selector"
      sx={{ width: '100%' }}
      options={categories}
      autoHighlight
      value={value}
      noOptionsText={"Chọn chủ đề bài viết..."}
      getOptionLabel={(category) => category.name}
      onSelect={(e, v) => onSelect(e, v)}
      renderOption={(props, category) => (
        <Box component="li" {...props} key={category.id}>
          {category.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
