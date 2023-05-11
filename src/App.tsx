import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { unstable_joySlots as joySlots } from "@mui/x-data-grid/joy";

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
      <Typography component="h1" variant="h3" sx={{ my: 3 }}>
        Joy DataGrid - CRUD
      </Typography>
      <DataGrid
        columns={[
          {
            field: "id",
            headerName: "ID",
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
