export default function authorization(user, page, router) {
  if (user !== null) {
    if (user.roles.includes("Admin") || user.roles.includes("Writer")) {
      router.push("/dashboard");
      return null;
    } else if (user.roles.includes("Censor")) {
      router.push("/censor");
      return null;
    } else {
      return page;
    }
  } else {
    return page;
  }
}
