import { AppBar, Chip, Stack, styled, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCategory } from "src/stores/categorySlice";


export function CategoryBar({ categories }) {
  const dispatch = useDispatch();
  const categoryId = useSelector(
    (state) => state.category.data.currentCategory
  );
  const open = useSelector((state) => state.drawer.data.open);
  const handleClick = (e, id) => {
    document
      .querySelectorAll(".chip")
      .forEach((el) => el.classList.remove("bg-green"));
    e.currentTarget.classList.add("bg-green");
    dispatch(setCurrentCategory(id));
  };
  return (
    <AppBar
      sx={{
        borderTop: "1px solid #E7EBF0",
        borderBottom: "1px solid #E7EBF0",
        backgroundColor: "white",
        px: 2,
        boxShadow: "none",
        width: "100%",
      }}
      position="absolute"
    >
      <Toolbar
        variant="dense"
        sx={{
          padding: "0px",
          justifyContent: "center",
          width: { md: open ? "88.39%" : "100%", sm: "100%" },
        }}
      >
        <Stack direction="row" spacing={1}>
          <Chip
            label="Tất cả"
            className={`chip ${
              categoryId === "" || categoryId === null ? "bg-green" : ""
            }`}
            variant="outlined"
            color="success"
            onClick={(e) => handleClick(e, "")}
          />

          {categories.map((category) => (
            <div key={category.id}>
              <Chip
                className={`chip ${
                  categoryId === category.id ? "bg-green" : ""
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
    </AppBar>
  );
}
