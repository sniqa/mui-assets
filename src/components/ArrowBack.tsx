import { IconArrowBack } from "@comps/FontAwesomeSvgs";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ArrowBack = () => {
  const navigate = useNavigate();

  return (
    <Tooltip title={"返回"}>
      <IconButton onClick={() => navigate(-1)}>
        <IconArrowBack />
      </IconButton>
    </Tooltip>
  );
};

export default ArrowBack;
