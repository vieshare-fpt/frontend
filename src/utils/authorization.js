export default function authorization(user, page, router) {
  if (user !== null) {
    if (user.roles.includes("Admin") || user.roles.includes("Writer")) {
      router.push("/dashboard");
      return;
    } else if (user.roles.includes("Censor")) {
      router.push("/dashboard/posts-management");
      return;
    } else {
      return page;
    }
  } else {
    return page;
  }
}
