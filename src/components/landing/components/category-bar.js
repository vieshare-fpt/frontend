import { AppBar, Chip, Stack, styled, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCategory } from "src/stores/categorySlice";
const AppBarMUI = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.appBar - 1,
  boxShadow: "none",
}));

export function CategoryBar({ categories }) {
  const dispatch = useDispatch();
  const categoryId = useSelector(
    (state) => state.category.data.currentCategory
  );

  const handleClick = (e, id) => {
    document
      .querySelectorAll(".chip")
      .forEach((el) => el.classList.remove("bg-salmon"));
      e.currentTarget.classList.add("bg-salmon");
    dispatch(setCurrentCategory(id));
  };
  return (
    <AppBarMUI
      disableGutters
      sx={{
        borderTop: "1px solid #E7EBF0",
        borderBottom: "1px solid #E7EBF0",
        backgroundColor: "white",
        padding: 0,
      }}
      position="static"
    >
      <Toolbar disableGutters variant="dense" sx={{ padding: "0 20px" }}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="Tất cả"
            className={`chip ${categoryId === ("" || null) ? "bg-salmon" : ""}`}
            variant="outlined"
            color="success"
            onClick={(e) => handleClick(e, '')}
          />

          {categories.map((category) => (
            <div key={category.id}>
              <Chip
                className={`chip ${
                  categoryId === category.id ? "bg-salmon" : ""
                }`}
                color="success"
                label={`${category.name}`}
                variant="outlined"
                onClick={(e) => handleClick(e, category.id)}
              />
            </div>
          ))}
        </Stack>
      </Toolbar>
    </AppBarMUI>
  );
}
