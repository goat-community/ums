import { Box, LinearProgress, LinearProgressProps } from "@mui/material";

export function LinearProgressBar(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "200px", mr: 1 }}>
        <LinearProgress
          color="primary"
          variant="determinate"
          value={props.value}
          {...props}
        />
      </Box>
    </Box>
  );
}
