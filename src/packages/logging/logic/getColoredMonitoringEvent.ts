import { MonitoringEvents } from '@/monitoring/domain';
import { SCOPE_DELIMITER, TYPE_DELIMITER } from '@/monitoring/constants';
import { getMonitoringEventParts } from '@/monitoring/utils';

import {
  COLOR_TO_PRINT_METHOD_MAP,
  EVENT_SCOPE_TO_COLOR_MAP,
  TYPE_TO_COLOR_MAP,
} from '../constants';

export default function getColoredMonitoringEvent<
  TEvent extends MonitoringEvents,
>(event: TEvent) {
  const [type, scope, name] = getMonitoringEventParts(event);

  const typeColor = TYPE_TO_COLOR_MAP[type];
  const scopeColor = EVENT_SCOPE_TO_COLOR_MAP[scope];
  const getTypeColored = COLOR_TO_PRINT_METHOD_MAP[typeColor];
  const getScopeColored = COLOR_TO_PRINT_METHOD_MAP[scopeColor];

  return `${getTypeColored(`${type}${TYPE_DELIMITER}`)}${getScopeColored(`${scope}${SCOPE_DELIMITER}${name}`)}`;
}