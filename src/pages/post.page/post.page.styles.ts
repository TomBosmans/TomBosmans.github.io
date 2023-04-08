import { createUseStyles } from "react-jss"

export const usePostPageStyles = createUseStyles({
  container: {
    maxWidth: 800,
    margin: "0 auto",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    marginBottom: 32,
  },
  content: {
    fontSize: 18,
  },
})
