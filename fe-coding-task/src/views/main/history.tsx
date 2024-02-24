import { Button, Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { IHousingQueryFormParams } from '../../types/housingQuery';
import { useState } from 'react';

interface IViewMainHistory {
  onSelect: (data: IHousingQueryFormParams) => void;
  handleHistorySave: () => void;
  history: IHousingQueryFormParams[]
}

const ViewMainHistory = ({ history, onSelect, handleHistorySave }: IViewMainHistory) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={handleHistorySave}>Save current params to history</Button>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Saved history" />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {history.map((item, key) => (
          <ListItemButton key={key} onClick={() => onSelect(item)}>
            <ListItemText primary={JSON.stringify(item)} />
          </ListItemButton>

          ))}
        </List>
      </Collapse>
    </div>
  );

  function handleClick() {
    setOpen(!open);
  }
};

export default ViewMainHistory;