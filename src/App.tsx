import { useState } from "react";
import { v4 } from "uuid";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import Button from "@mui/joy/Button";
import CssBaseline from "@mui/joy/CssBaseline";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  useGridApiContext,
} from "@mui/x-data-grid";
import { unstable_joySlots as joySlots } from "@mui/x-data-grid/joy";
import DeleteIcon from "@mui/icons-material/Delete";
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

const EditToolbar = () => {
  const apiRef = useGridApiContext();
  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        onClick={() => {
          const id = `__new-${v4()}`;
          apiRef.current.updateRows([
            {
              id,
              name: "New",
              manufacturedDate: null,
              manufacturedCountry: null,
              price: 0,
            },
          ]);
          apiRef.current.startRowEditMode({
            id,
            fieldToFocus: "manufacturedCountry",
          });
        }}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

function App() {
  const [rows, setRows] = useState(DATA);
  return (
    <Container>
      <CssBaseline />
      <Typography component="h1" level="h3" sx={{ my: 3 }}>
        Joy DataGrid - CRUD
      </Typography>
      <DataGrid
        editMode="row"
        processRowUpdate={(row) => {
          const isExistingRow = !row.id.startsWith("__new-"); // check if row is new
          if (isExistingRow) {
            setRows((prevRows) =>
              prevRows.map((item) => (item.id === row.id ? row : item))
            );
            return row;
          }
          const newId = v4(); // generate unique id
          const updatedRow = { ...row, id: newId };
          setRows((prevRows) => [...prevRows, updatedRow]);
          return updatedRow;
        }}
        columns={[
          {
            field: "id",
            headerName: "ID",
            valueFormatter: (params) =>
              params.value.startsWith("__new-") ? "" : params.value,
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
            width: 100,
            editable: true,
          },
          {
            field: "price",
            headerName: "Price",
            width: 100,
            editable: true,
            type: "number",
          },
          {
            field: "manufacturedDate",
            headerName: "Manufactured date",
            width: 160,
            editable: true,
            type: "date",
            valueFormatter: (params) => (params.value as Date)?.toDateString(),
          },
          {
            field: "actions",
            type: "actions",
            getActions: (params) => [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => {
                  setRows((prevRows) =>
                    prevRows.filter((item) => item.id !== params.row.id)
                  );
                }}
                color="inherit"
              />,
            ],
          },
        ]}
        rows={rows}
        slots={{
          ...joySlots,
          toolbar: EditToolbar,
        }}
        sx={{ minHeight: 400 }}
      />
    </Container>
  );
}

export default App;
