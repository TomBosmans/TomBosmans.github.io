import { createUseStyles } from "react-jss"

export const useBlogPageStyles = createUseStyles({
  container: {
    maxWidth: 800,
    margin: "0 auto",
  },
  post: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    marginBottom: 8,
  },
})
