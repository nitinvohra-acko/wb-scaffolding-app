import {
  Box,
  Button,
  Checkbox,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { FilterOption } from '@/types/task';
const Index: FC<{
  options: FilterOption[];
  value: Array<string>;
  onChange: (value: Array<string>) => void;
  label: string;
  showCount?: boolean;
}> = ({ options, value = [], onChange, label, showCount = true }) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchStr, setSearchStr] = useState('');
  const isAllSelected = useMemo(() => {
    return filteredOptions.length === value.length;
  }, [filteredOptions, value]);
  const [open, setOpen] = useState(value?.length > 0 ? true : false);
  const handleToggle = (newValue: string) => () => {
    const currentIndex = value.indexOf(newValue);
    const newChecked = [...value];
    if (newValue === 'all') {
      if (newChecked.length === filteredOptions.length) {
        onChange([]);
      } else {
        onChange(filteredOptions.map((o) => o.value));
      }
      return;
    }
    if (currentIndex === -1) {
      newChecked.push(newValue);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onChange(newChecked);
  };
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);
  const onSearch = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const val = e.target.value;
    setSearchStr(val);
    if (val) {
      setFilteredOptions(
        options.filter((v) =>
          v.value?.toLowerCase().includes(val?.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(options);
    }
  };
  const clearSearch = () => {
    setSearchStr('');
    setFilteredOptions(options);
  };
  return (
    <>
      <Box
        sx={{
          width: '100%',
          borderBottom: '1px solid #eee',
          padding: '0 10px 10px',
        }}
      >
        <Box
          onClick={() => setOpen(!open)}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} fontSize={14}>
            {label}
          </Typography>
          <Icon sx={{ cursor: 'pointer' }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Icon>
        </Box>
        {open && (
          <>
            <Input
              fullWidth
              sx={{ my: 1 }}
              id="search"
              placeholder="search"
              value={searchStr}
              onChange={onSearch}
              startAdornment={
                <InputAdornment position="start">
                  <SearchSharpIcon />
                </InputAdornment>
              }
              endAdornment={
                searchStr ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={clearSearch}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <ClearSharpIcon />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ''
                )
              }
            />
            {filteredOptions.length > 0 ? (
              <List sx={{ cursor: 'pointer' }}>
                {filteredOptions.length > 1 && (
                  <ListItem
                    value="all"
                    sx={{ padding: 0 }}
                    onClick={handleToggle('all')}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Checkbox
                        color="info"
                        size="small"
                        checked={isAllSelected ?? false}
                        indeterminate={
                          value.length > 0 && value.length < options.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: '14px' }}>
                          Select All
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
                {filteredOptions.map((d, i: number) => (
                  <ListItem
                    value={d.value}
                    key={i}
                    style={{ padding: 0 }}
                    onClick={handleToggle(d.value)}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Checkbox
                        color={'info'}
                        checked={value?.includes(d.value)}
                        size="small"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: '14px',
                          }}
                        >
                          {d.value.split('_').join(' ')}{' '}
                          {showCount && <b>({d.count})</b>}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No data found</Typography>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Index;
