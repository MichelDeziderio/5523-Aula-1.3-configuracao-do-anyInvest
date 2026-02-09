import { Injectable } from '@angular/core';

export type InvestorProfile = 'Conservador' | 'Moderado' | 'Arrojado';

export type ScoreResult = {
  score: number; // 0..100
  profile: InvestorProfile;
  explanation: string[];
};

@Injectable({ providedIn: 'root' })
export class ProfileScoreService {
  compute(v: any): ScoreResult {
    let score = 0;
    const why: string[] = [];

    // Horizonte
    if (v.horizon === '5+ anos') { score += 15; why.push('Horizonte longo aumenta tolerância a volatilidade.'); }
    else if (v.horizon === '3-5 anos') { score += 10; why.push('Horizonte médio dá espaço para oscilações.'); }
    else if (v.horizon === '1-3 anos') { score += 6; }
    else if (v.horizon === '0-6 meses') { why.push('Horizonte curto tende a exigir mais segurança.'); }

    // Liquidez
    if (v.liquidityNeed === 'Não pretendo resgatar') { score += 12; why.push('Baixa necessidade de resgate permite estratégias mais agressivas.'); }
    else if (v.liquidityNeed === 'Raramente') { score += 9; }
    else if (v.liquidityNeed === 'Em 1-3 meses') { score += 5; }
    else if (v.liquidityNeed === 'A qualquer momento') { why.push('Alta necessidade de liquidez favorece perfil conservador.'); }

    // Experiência
    if (v.experienceLevel === 'Avançado') { score += 10; why.push('Experiência avançada aumenta conforto com risco.'); }
    else if (v.experienceLevel === 'Intermediário') { score += 6; }

    // Reação a quedas
    if (v.drop10 === 'Compro mais') { score += 8; why.push('Comprar na queda indica maior apetite por risco.'); }
    else if (v.drop10 === 'Mantenho') { score += 5; }

    if (v.drop30 === 'Compro mais') { score += 15; why.push('Suportar quedas maiores é típico de perfil arrojado.'); }
    else if (v.drop30 === 'Mantenho') { score += 9; }

    // Preferência
    if (v.preference === 'Maior retorno') { score += 15; why.push('Preferência por retorno tende a aceitar maior risco.'); }
    else if (v.preference === 'Equilíbrio') { score += 8; }
    else if (v.preference === 'Previsibilidade') { why.push('Preferência por previsibilidade sugere perfil conservador.'); }

    // Capacidade financeira (simples)
    if (v.hasEmergencyFund === 'Sim') { score += 6; why.push('Reserva de emergência aumenta capacidade de manter investimentos.'); }
    if (v.hasDebts === 'Sim, altas') { score -= 8; why.push('Dívidas altas reduzem capacidade de assumir risco.'); }

    score = Math.max(0, Math.min(100, score));

    let profile: InvestorProfile = 'Moderado';
    if (score <= 33) profile = 'Conservador';
    else if (score <= 66) profile = 'Moderado';
    else profile = 'Arrojado';

    return { score, profile, explanation: why.slice(0, 5) };
  }
}
