// export default function authorization(user, page, router) {
//   if (user !== null) {
//     if (user.roles.includes("Admin") || user.roles.includes("Writer")) {
//       router.push("/dashboard");
//       return;
//     } else if (user.roles.includes("Censor")) {
//       router.push("/dashboard/posts-management");
//       return;
//     } else {
//       return page;
//     }
//   } else {
//     if (router.asPath === "/history-payment") {
//       router.push("/");
//       return;
//     } else {
//       return page;
//     }
//   }
// }

export const authorization = {
  censor(user, page, router) {
  },
  admin(user, page, router) {},
  writer(user, page, router) {
  },
  reader(user, page, router) {
    if (user !== null) {
      if (!user.roles.includes("User")) {
        router.push("/not-found");
        return;
      } else {
        return page;
      }
    } else {
      switch (router?.asPath) {
        case "/history-payment":
          router.push("/not-found");
          break;
        default:
          return page;
      }
    }
  },
};
