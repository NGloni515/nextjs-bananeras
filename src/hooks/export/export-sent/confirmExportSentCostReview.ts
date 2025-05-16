import axios from '../../../lib/axios';

export const confirmExportSentCostReview = async (
  exportSentId: number
): Promise<void> => {
  await axios.patch(`/export-sent/${exportSentId}/confirm-producer-cost`);
};
