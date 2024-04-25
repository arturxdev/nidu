import { processAMEXCredit } from './amex/credit';
import { processBanamexDebit } from './banamex/debit';
import { processBBVACredit } from './bvva/credit';
import { processBBVADebit } from './bvva/debit';
export const csvService = {
  bbva: {
    credit: processBBVACredit,
    debit: processBBVADebit
  },
  amex: { credit: processAMEXCredit },
  banamex: { debit: processBanamexDebit }
}
