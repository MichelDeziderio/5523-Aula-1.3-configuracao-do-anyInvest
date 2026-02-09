import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export type RowForm = FormGroup<{
  investmentId: FormControl<string>;
  percent: FormControl<number>;
}>;

export type InvestmentCategory = 'Renda Fixa' | 'Fundos' | 'Renda Variável';

export interface InvestmentColors {
  background: string;
  border: string;
  text: string;
}

export interface InvestmentType {
  id: string;
  label: string;
  instituicao: 'ALURA';
  categoria: InvestmentCategory;
  colors: InvestmentColors;
}

export const INVESTMENT_TYPES: InvestmentType[] = [
  {
    id: 'alura_cdb',
    label: 'CDB ALURA',
    instituicao: 'ALURA',
    categoria: 'Renda Fixa',
    colors: {
      background: '#EAF4FF',
      border: '#C9E1FF',
      text: '#5594db',
    },
  },
  {
    id: 'alura_lci',
    label: 'LCI ALURA',
    instituicao: 'ALURA',
    categoria: 'Renda Fixa',
    colors: {
      background: '#EDF6FF',
      border: '#D3E7FF',
      text: '#5594db',
    },
  },
  {
    id: 'alura_lca',
    label: 'LCA ALURA',
    instituicao: 'ALURA',
    categoria: 'Renda Fixa',
    colors: {
      background: '#E6F2FF',
      border: '#BCD9FF',
      text: '#5594db',
    },
  },
  {
    id: 'alura_tesouro_selic',
    label: 'Tesouro Selic ALURA',
    instituicao: 'ALURA',
    categoria: 'Renda Fixa',
    colors: {
      background: '#F0F7FF',
      border: '#D6EAFF',
      text: '#5594db',
    },
  },
  {
    id: 'alura_tesouro_ipca',
    label: 'Tesouro IPCA+ ALURA',
    instituicao: 'ALURA',
    categoria: 'Renda Fixa',
    colors: {
      background: '#E8F3FF',
      border: '#C5DCFF',
      text: '#5594db',
    },
  },

  /* ================= FUNDO ================= */

  {
    id: 'alura_fundo_renda_fixa',
    label: 'Fundo de Renda Fixa ALURA',
    instituicao: 'ALURA',
    categoria: 'Fundos',
    colors: {
      background: '#EDF9FF',
      border: '#C7EBFF',
      text: '#155E75',
    },
  },
  {
    id: 'alura_fundo_multimercado',
    label: 'Fundo Multimercado ALURA',
    instituicao: 'ALURA',
    categoria: 'Fundos',
    colors: {
      background: '#E8F7FF',
      border: '#BFE6FF',
      text: '#155E75',
    },
  },
  {
    id: 'alura_fundo_acoes',
    label: 'Fundo de Ações ALURA',
    instituicao: 'ALURA',
    categoria: 'Fundos',
    colors: {
      background: '#F0FBFF',
      border: '#D0F0FF',
      text: '#155E75',
    },
  },

  /* ================= RENDA VARIÁVEL ================= */

  {
    id: 'alura_fii',
    label: 'FII ALURA',
    instituicao: 'ALURA',
    categoria: 'Renda Variável',
    colors: {
      background: '#E8F3FF',
      border: '#BFD9FF',
      text: '#1E40AF',
    },
  },
  {
    id: 'alura_acoes',
    label: 'Ações ALURA',
    instituicao: 'ALURA',
    categoria: 'Renda Variável',
    colors: {
      background: '#EEF4FF',
      border: '#CBDDFF',
      text: '#1E40AF',
    },
  },
];

export function noDuplicateInvestmentValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const arr = control as FormArray;
    const ids = arr.controls
      .map((g) => (g as RowForm).controls.investmentId.value)
      .filter((v) => !!v);

    const set = new Set(ids);
    if (set.size !== ids.length) return { duplicateInvestment: true };
    return null;
  };
}

export function sumPercentMustBe100Validator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const arr = control as FormArray;

    const total = arr.controls.reduce((sum, g) => {
      const v = Number((g as RowForm).controls.percent.value);
      return sum + (isFinite(v) ? v : 0);
    }, 0);

    return total === 100 ? null : { sumNot100: true };
  };
}
