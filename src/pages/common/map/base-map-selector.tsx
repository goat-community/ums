import MapIcon from "@mui/icons-material/Map";
import Fab from "@mui/material/Fab";

import * as D from "@constants/design";

export function BaseMapSelector() {
  return (
    <>
      <Fab size="small" sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}>
        <MapIcon />
      </Fab>
      {/* <Dialog open={open} onClose={handleClose} maxWidth="xl" sx={{ marginTop: 2 }}>
        <Box p={1}>
          <DialogTitle variant="h4">Layers</DialogTitle>
          <DialogContent sx={{ padding: 0, maxHeight: 200 }}>
            <List dense sx={{ width: "100%" }}>
              <LayersList
                layers_list={layersList}
                current_layer={checked}
                on_change={(new_layer: string) => setChecked(new_layer)}
                radio_clicked={(layer_name: string) => {
                  if (checked.includes(layer_name)) {
                    setChecked("");
                  }
                }}
              />
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleChange}>Apply</Button>
          </DialogActions>
        </Box>
      </Dialog> */}
    </>
  );
}
