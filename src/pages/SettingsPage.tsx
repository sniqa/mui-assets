import { Switch } from "@mui/material";
import { toggleDarkModel } from "@lib/tailwindDarkModel";

const SettingsPage = () => {
  return (
    <div>
      DARK MODE
      <Switch onChange={toggleDarkModel}></Switch>
    </div>
  );
};

export default SettingsPage;
