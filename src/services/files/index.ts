import { processAMEXCredit } from './amex/credit';
import { processBBVACredit } from './bvva/credit';
import { processBBVADebit } from './bvva/debit';
export const csvService = {
  bbva: {
    credit: processBBVACredit,
    debit: processBBVADebit
  },
  amex: { credit: processAMEXCredit }
}
