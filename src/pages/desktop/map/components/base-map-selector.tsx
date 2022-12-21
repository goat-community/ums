import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import {
  //   Box,
  //   Button,
  //   Dialog,
  //   DialogActions,
  //   DialogContent,
  //   DialogTitle,
  IconButton,
  //   List,
  //   ListItem,
  //   ListItemButton,
  //   ListItemText,
  //   Radio,
  //   RadioGroup,
} from "@mui/material";

// import { convert_from_pascal } from "@utils";

// import { useAppDispatch, useAppSelector } from "@hooks/context";

// import { toggleLayer, toggleOffAllLayers } from "@context/map";
// import { map_layers_list_selector } from "@context/map/map-selector";

// function LayersList(props: {
//   layers_list: ReturnType<typeof map_layers_list_selector>;
//   current_layer: string;
//   radio_clicked: (layer_name: string) => void;
//   on_change: (e: string) => void;
// }) {
//   return (
//     <RadioGroup
//       value={props.current_layer}
//       onChange={(e) => props.on_change(e.target.value)}
//     >
//       {props.layers_list.map((i) => {
//         const labelId = `label-${i.label}`;
//         return (
//           <ListItem
//             key={i.label}
//             disablePadding
//             secondaryAction={
//               <Radio
//                 edge="end"
//                 inputProps={{ "aria-labelledby": labelId }}
//                 value={i.label}
//                 onClick={() => props.radio_clicked(i.label)}
//               />
//             }
//             sx={{ marginTop: 1 }}
//           >
//             <ListItemButton>
//               <ListItemText id={labelId} primary={i.label} />
//             </ListItemButton>
//           </ListItem>
//         );
//       })}
//     </RadioGroup>
//   );
// }

export function BaseMapSelector() {
  //   const dispatch = useAppDispatch();
  //   const layersList = useAppSelector(map_layers_list_selector);
  //   const [open, setOpen] = useState<boolean>(false);
  //   const [checked, setChecked] = useState<string>(
  //     () => layersList.find((i) => i.visibility != "none")?.label || ""
  //   );

  //   const handleChange = () => {
  //     dispatch(toggleOffAllLayers());
  //     if (checked) {
  //       console.log(convert_from_pascal(checked));
  //       dispatch(toggleLayer(convert_from_pascal(checked)));
  //     }
  //     setOpen(false);
  //   };

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <>
      <IconButton color="primary" sx={{ backgroundColor: "white" }}>
        <BrushOutlinedIcon />
      </IconButton>
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