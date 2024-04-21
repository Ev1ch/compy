import { Box, Stack, type SxProps } from '@mui/material';
import { memo } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { useSelector } from '@/store/hooks';
import { getArrayedSx } from '@/styles/logic';

import { selectShownEvents } from '../../../store';
import MonitoringEventNode from '../MonitoringEventNode';
import MonitoringEventsTreeHeader from '../MonitoringEventsTreeHeader';
import Selections from '../Selections';

export interface MonitoringEventsTreeProps {
  readonly sx?: SxProps;
}

const ROOT_SX = {
  left: 2.5,
};

export default memo(function MonitoringEventsTree({
  sx = EMPTY_OBJECT,
}: MonitoringEventsTreeProps) {
  const shownEvents = useSelector(selectShownEvents);

  return (
    <Box
      sx={[
        {
          p: 2,
        },
        ...getArrayedSx(sx),
      ]}
      component="section"
    >
      <Box
        sx={{
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <MonitoringEventsTreeHeader
          sx={{ position: 'sticky', mb: 1, top: 0, zIndex: 4 }}
        />

        <Selections sx={ROOT_SX} />

        <Stack
          sx={{
            position: 'relative',
            alignItems: 'flex-end',
            mr: 22.65,
            zIndex: 2,
          }}
          spacing={1}
        >
          {shownEvents.map((shownEvent) => (
            <MonitoringEventNode
              key={shownEvent.context.id}
              event={shownEvent}
            />
          ))}
        </Stack>
        <Box
          sx={{
            top: 0,
            bottom: 0,
            width: 5,
            bgcolor: 'grey.300',
            position: 'absolute',
            right: 183.5,
          }}
        />
      </Box>
    </Box>
  );
});
