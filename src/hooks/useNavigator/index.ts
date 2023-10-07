import { useRouter } from "vue-router";

export function useNavigator() {
  const router = useRouter();
  return {
    router,
    user: {
      goPhotoDetail: (pid: number) => router.push(`/photo/detail/${pid}`),
      goMyLiked: () => router.push("/my/liked"),
      goMyPhoto: () => router.push("/my/published"),
      goUser: (uid: number) => router.push(`/user/${uid}`),
      goHome: () => router.push("/"),
      goEdit: () => router.push("/edit"),
      goSearch: (keywords: string) =>
        router.push({ path: "/search", query: keywords ? { keywords } : {} }),
    },
    goLogin: () => router.push("/login"),
    goRegister: () => router.push("/register"),
  };
}
