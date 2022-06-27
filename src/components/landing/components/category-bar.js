import { AppBar, Chip, Stack, styled, Toolbar } from "@mui/material";
import Link from "next/link";
const AppBarMUI = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.appBar - 1,
  boxShadow: "none",
}));
export function CategoryBar({ categories }) {
  return (
    <AppBarMUI
      disableGutters
      sx={{
        borderTop: "1px solid #E7EBF0",
        borderBottom: "1px solid #E7EBF0",
        backgroundColor: "white",
        padding: 0
      }}
      position="static"
    >
      <Toolbar disableGutters variant="dense" sx={{ padding: "0 20px" }}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="All"
            component="a"
            href="#basic-chip"
            variant="outlined"
            color="success"
            clickable
          />

          {categories.map((category) => (
            <Link href={`category/${category.id}`} key={category.id}>
              <Chip
                label={`${category.name}`}
                component="a"
                href="#basic-chip"
                variant="outlined"
                color="success"
                clickable
              />
            </Link>
          ))}
        </Stack>
      </Toolbar>
    </AppBarMUI>
  );
}
