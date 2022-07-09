import { clearInfoSuccess } from "src/stores/userSlice";

export default function catchError(error, dispatch, router) {
  if (error?.response?.status === 401 || error?.response?.status === 400) {
    router.push("/login");
    dispatch(clearInfoSuccess());
  } else {
    dispatch(clearInfoSuccess());
  }
}
