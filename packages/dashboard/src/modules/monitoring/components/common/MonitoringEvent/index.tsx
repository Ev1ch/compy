import { ArrowRight } from '@mui/icons-material';
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import {
  EVENT_SCOPE_TO_COLOR_MAP,
  getTimestamp,
  TYPE_TO_COLOR_MAP,
} from '@compyto/logging';
import {
  getMonitoringEventKeyParts,
  SCOPE_DELIMITER,
  TYPE_DELIMITER,
  type MonitoringEvent as TMonitoringEvent,
} from '@compyto/monitoring';

import {
  COLOR_TO_CHIP_COLOR_MAP,
  COLOR_TO_STYLE_COLOR_MAP,
} from '../../../constants';

export interface MonitoringEventProps {
  readonly event: TMonitoringEvent;
}

export default function MonitoringEvent({
  event: { key, context, args },
}: MonitoringEventProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [type, scope, name] = getMonitoringEventKeyParts(key);
  const typeColor = TYPE_TO_COLOR_MAP[type];
  const scopeColor = EVENT_SCOPE_TO_COLOR_MAP[scope];

  function handleExpandToggle() {
    setIsExpanded((prevState) => !prevState);
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',

        '&::before': {
          order: 1,
          display: 'block',
          content: '""',
          width: 40,
          height: 2,
          bgcolor: 'grey.400',
        },
        '&::after': {
          order: 2,
          display: 'block',
          content: '""',
          width: 10,
          height: 10,
          borderRadius: '50%',
          bgcolor: 'grey.400',
        },
      }}
    >
      <Chip
        sx={{ height: 'auto' }}
        variant="outlined"
        color={COLOR_TO_CHIP_COLOR_MAP[typeColor]}
        label={
          <Box>
            <Typography sx={{ cursor: 'pointer' }} onClick={handleExpandToggle}>
              <Typography component="span">
                [{getTimestamp(context.emittedAt)}]
              </Typography>{' '}
              <Typography component="span">
                {type}
                {TYPE_DELIMITER}
              </Typography>
              <Typography
                sx={{ color: COLOR_TO_STYLE_COLOR_MAP[scopeColor] }}
                component="span"
              >
                {scope}
                {SCOPE_DELIMITER}
              </Typography>
              <Typography sx={{ color: 'black' }} component="span">
                {name}
              </Typography>
              <ArrowRight
                sx={[
                  { verticalAlign: 'middle' },
                  isExpanded && {
                    transform: 'rotate(90deg)',
                  },
                ]}
              />
            </Typography>
            {isExpanded && (
              <List dense disablePadding>
                {args.map((arg, index) => (
                  <ListItem key={index} disablePadding disableGutters>
                    <ListItemText primary={JSON.stringify(arg, null, 2)} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        }
      />
    </Box>
  );
}