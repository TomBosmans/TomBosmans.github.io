import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"

export default function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="blockquote"
      sx={{
        borderLeft: "4px solid",
        borderColor: "neutral.400",
        pl: 2,
        my: 2,
        color: "text.secondary",
      }}
    >
      <Typography level="body1">{children}</Typography>
    </Box>
  )
}
