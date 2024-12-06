import { useResetRecoilState } from 'recoil';

import { SOFT_FOCUS_CLICK_OUTSIDE_LISTENER_ID } from '@/object-record/record-table/constants/SoftFocusClickOutsideListenerId';
import { useDragSelect } from '@/ui/utilities/drag-select/hooks/useDragSelect';
import { useSetHotkeyScope } from '@/ui/utilities/hotkey/hooks/useSetHotkeyScope';
import { useClickOutsideListener } from '@/ui/utilities/pointer-event/hooks/useClickOutsideListener';

import { RecordGroupContext } from '@/object-record/record-group/states/context/RecordGroupContext';
import { recordTablePendingRecordIdByGroupComponentFamilyState } from '@/object-record/record-table/states/recordTablePendingRecordIdByGroupComponentFamilyState';
import { recordTablePendingRecordIdComponentState } from '@/object-record/record-table/states/recordTablePendingRecordIdComponentState';
import { useRecoilComponentCallbackStateV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackStateV2';
import { useContext } from 'react';
import { isDefined } from '~/utils/isDefined';
import { useCloseCurrentTableCellInEditMode } from '../../hooks/internal/useCloseCurrentTableCellInEditMode';
import { TableHotkeyScope } from '../../types/TableHotkeyScope';

export const useCloseRecordTableCellV2 = (recordTableId: string) => {
  const context = useContext(RecordGroupContext);

  const setHotkeyScope = useSetHotkeyScope();
  const { setDragSelectionStartEnabled } = useDragSelect();

  const { toggleClickOutsideListener } = useClickOutsideListener(
    SOFT_FOCUS_CLICK_OUTSIDE_LISTENER_ID,
  );

  const closeCurrentTableCellInEditMode =
    useCloseCurrentTableCellInEditMode(recordTableId);

  const pendingRecordIdState = useRecoilComponentCallbackStateV2(
    recordTablePendingRecordIdComponentState,
    recordTableId,
  );
  const recordTablePendingRecordIdByGroupFamilyState =
    useRecoilComponentCallbackStateV2(
      recordTablePendingRecordIdByGroupComponentFamilyState,
    );
  const resetRecordTablePendingRecordId =
    useResetRecoilState(pendingRecordIdState);
  const resetRecordTablePendingRecordIdByGroupFamily = useResetRecoilState(
    recordTablePendingRecordIdByGroupFamilyState(context?.recordGroupId),
  );

  const closeTableCell = async () => {
    toggleClickOutsideListener(true);
    setDragSelectionStartEnabled(true);
    closeCurrentTableCellInEditMode();
    setHotkeyScope(TableHotkeyScope.TableSoftFocus);
    resetRecordTablePendingRecordId();
    if (isDefined(context?.recordGroupId)) {
      resetRecordTablePendingRecordIdByGroupFamily();
    }
  };

  return {
    closeTableCell,
  };
};
