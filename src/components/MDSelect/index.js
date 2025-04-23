import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
      width: 250,
    },
  },
};

const names = [
  "Moderator",
  "Driver"
];

export default function MultipleSelectCheckmarks({ role, setRole }) {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRole(typeof value === "string" ? value.split(",") : value)
  };

  return (
    <div>
      <FormControl sx={{ width: "100%", mb: 2 }}>
        <InputLabel id="demo-multiple-checkbox-label">Role</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          // multiple
          style={{ height: 45 }}
          value={role}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(",")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={role.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
