import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import CssBaseline from "@mui/joy/CssBaseline";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { unstable_joySlots as joySlots } from "@mui/x-data-grid/joy";
import countries from "./countries.json";

const DATA = [
  { id: "1", name: "spray", manufacturedDate: new Date(), price: 200 },
  {
    id: "2",
    name: "foam",
    manufacturedDate: new Date("2021-05-22"),
    price: 120,
  },
];

function App() {
  return (
    <Container>
      <CssBaseline />
      <Typography component="h1" level="h3" sx={{ my: 3 }}>
        Joy DataGrid - CRUD
      </Typography>
      <DataGrid
        editMode="row"
        columns={[
          {
            field: "id",
            headerName: "ID",
          },
          {
            field: "manufacturedCountry",
            headerName: "Manufactured country",
            width: 300,
            editable: true,
            renderCell: (params) =>
              params.value ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${params.value.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${params.value.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {params.value.label}
                </Box>
              ) : null,
            renderEditCell: (params) => (
              <Autocomplete
                placeholder="Choose a country"
                autoFocus
                openOnFocus
                options={countries}
                getOptionLabel={(option) => option.label}
                variant="plain"
                sx={{
                  "--Input-focusedHighlight": "transparent",
                  width: "100%",
                }}
                onChange={(event, value) => {
                  params.api.setEditCellValue({
                    field: params.field,
                    id: params.id,
                    value,
                  });
                }}
                renderOption={(props, option) => (
                  <AutocompleteOption {...props}>
                    <ListItemDecorator>
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                    </ListItemDecorator>
                    <ListItemContent sx={{ fontSize: "sm" }}>
                      {option.label}
                      <Typography level="body3">
                        ({option.code}) +{option.phone}
                      </Typography>
                    </ListItemContent>
                  </AutocompleteOption>
                )}
              />
            ),
          },
          {
            field: "name",
            headerName: "Name",
            width: 160,
            editable: true,
          },
          {
            field: "price",
            headerName: "Price",
            width: 160,
            editable: true,
            type: "number",
          },
          {
            field: "manufacturedDate",
            headerName: "Manufactured date",
            width: 160,
            editable: true,
            type: "date",
            valueFormatter: (params) => (params.value as Date).toDateString(),
          },
        ]}
        rows={DATA}
        slots={joySlots}
      />
    </Container>
  );
}

export default App;
