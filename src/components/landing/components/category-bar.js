import { AppBar, Chip, Stack, styled, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCategory } from "src/stores/categorySlice";
import Slider from "react-slick";
import styles from "src/styles/Category.module.css";
export function CategoryBar({ categories }) {
  const dispatch = useDispatch();
  const categoryId = useSelector(
    (state) => state.category.data.currentCategory
  );
  const open = useSelector((state) => state.drawer.data.open);
  function CustomArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", }}
        onClick={onClick}
      />
    );
  }
  const handleClick = (e, id) => {
    document
      .querySelectorAll(".chip")
      .forEach((el) => el.classList.remove("bg-green"));
    e.currentTarget.classList.add("bg-green");
    dispatch(setCurrentCategory(id));
  };
  var settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 4,
    initialSlide: 0,
    variableWidth: true,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          initialSlide: 0,

        },
      },
    ],
  };
  return (
    <>
      <AppBar
        sx={{
          borderTop: "1px solid #E7EBF0",
          borderBottom: "1px solid #E7EBF0",
          backgroundColor: "white",
          px: 2,
          boxShadow: "none",
          width: "100%",
          padding: 0,
        }}
        position="absolute"
      >
        <Toolbar
          variant="dense"
          disableGutters
        sx={{
                    width: { md: open ? "88.39%" : "100%", sm: "100%" },

        }}
        >
          <div className={styles.container}>
            <Slider {...settings}>
              <Chip
                sx={{
                  ".MuiChip-label": {
                    lineHeight: "29px",
                  },
                }}
                label="Tất cả"
                className={`chip ${
                  categoryId === "" || categoryId === null ? "bg-green" : ""
                }`}
                variant="outlined"
                color="success"
                onClick={(e) => handleClick(e, "")}
              />
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  className={`chip ${
                    categoryId === category.id ? "bg-green" : ""
                  }`}
                  sx={{
                    ".MuiChip-label": {
                      lineHeight: "29px",
                    },
                  }}
                  color="success"
                  label={`${category.name}`}
                  variant="outlined"
                  onClick={(e) => handleClick(e, category.id)}
                />
              ))}
            </Slider>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
