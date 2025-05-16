import axios from '../../../lib/axios';

export const patchExportSentMaterialCost = async (
  id: number,
  payload: { unitCost: number }
): Promise<void> => {
  await axios.patch(`/export-sent-material/${id}`, payload);
};
