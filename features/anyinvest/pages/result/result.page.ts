import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { WizardStorageService } from '../../state/wizard-storage.service';
import { INVESTMENT_TYPES } from '../../utils/investment-types.data';
import { InvestmentsSplitService } from '../../state/investments-split.service';
import { CommonModule } from '@angular/common';
import { ProfileFormService } from '../../state/profile-form.service';
import { ProfileScoreService } from '../../state/profile-score.service';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './result.page.html',
  styleUrl: './result.page.scss',
})
export class ResultPage {
  private userId: string;
  result: any;
  name!: string | null;
  isShowMoreInfo = false;
  isShowDetails = false;
  investimentsList = INVESTMENT_TYPES;
  isInvestimentsLoaded = false;
  isInvestimentsList!: any;
  investimetTotal!: number;

  constructor(
    public state: ProfileFormService,
    private score: ProfileScoreService,
    private router: Router,
    auth: AuthService,
    storage: WizardStorageService,
    storeInvestiments: InvestmentsSplitService
  ) {
    this.userId = auth.currentUser?.id ?? 'anonymous';

    this.result = signal(this.score.compute(this.state.form.getRawValue()));

    if (auth.currentUser?.name.includes(' ')) {
      this.name = auth.currentUser?.name.split(' ')[0];
    } else {
      this.name = auth.currentUser?.name ? auth.currentUser?.name : null;
    }

    if (storeInvestiments.load()) {
      this.isInvestimentsLoaded = true;
      this.investimetTotal = storeInvestiments.load()?.totalValue ?? 0;
      const investimentsFromStore = storeInvestiments.load();
      this.isInvestimentsList = this.investimentsList
        .filter(investiment =>
          investimentsFromStore?.rows.some(
            row => row.investmentId === investiment.id
          )
        )
        .map(investiment => {
          const row = investimentsFromStore?.rows.find(
            r => r.investmentId === investiment.id
          );

          return {
            ...investiment,
            percent: row?.percent ?? 0,
          };
        });

    } else {
      this.isInvestimentsList = this.investimentsList;
    }

    const saved = storage.load(this.userId);
    if (saved?.formValue) {
      this.state.form.patchValue(saved.formValue);
      this.result.set(this.score.compute(this.state.form.getRawValue()));
      this.validShowMoreInfo();
    } else {
      this.router.navigateByUrl('/anyinvest/descubra-seu-perfil');
    }

  }

  get pct() { return this.result().score; }
  get profile() { return this.result().profile; }

  validShowMoreInfo() {
    if (this.router.url.includes('perfil')) {
      this.isShowMoreInfo = true;
      this.isShowDetails = false;
    } else {
      this.isShowMoreInfo = false;
      this.isShowDetails = true;
    }
  }

  reset() {
    this.router.navigateByUrl('/anyinvest/descubra-seu-perfil');
  }
}
