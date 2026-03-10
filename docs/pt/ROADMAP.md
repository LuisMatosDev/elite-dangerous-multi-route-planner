# Elite Dangerous Multi-Route Planner — Roadmap

> Versão atual: 0.1.0-dev
> Stack: Electron + React + Vite
> Repositório: https://github.com/LuisMatosDev/elite-dangerous-multi-route-planner

---

## Sistema de Prioridades

| Cor | Nível | Descrição |
|-----|-------|-----------|
| 🔴 | Crítico | App não funciona corretamente sem isto |
| 🟠 | Urgente | Impacto direto na usabilidade |
| 🟡 | Prioritário | Melhora significativamente a experiência |
| 🟢 | Não Urgente | Nice to have |
| 🔵 | Normal | Polish e apresentação |

---

## Fase 1 — Core Local (atual)

| Estado | Prioridade | Feature |
|--------|-----------|---------|
| ✅ Done | 🔴 | JournalWatcher — leitura de logs em tempo real |
| ✅ Done | 🔴 | StatusBar — sistema atual, nave, jump range |
| ✅ Done | 🔴 | SystemSearch — pesquisa de sistemas visitados |
| ✅ Done | 🔴 | WaypointList — adicionar/remover/reordenar waypoints |
| ✅ Done | 🔴 | RouteCalculator — cálculo de distâncias e jumps locais |
| ✅ Done | 🔴 | RoutePanel — layout principal unificado |
| ✅ Done | 🔴 | WCAG 2.1 AA — acessibilidade e usabilidade |

---

## Fase 2 — Funcionalidade Essencial

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| ⏳ Pending | 🔴 | Guardar e carregar rotas | Usar electron-store |
| ⏳ Pending | 🔴 | Deteção de Elite Dangerous em execução | Verificar processo ativo |
| ⏳ Pending | 🟠 | Botão "Adicionar sistema atual" como waypoint | 1 clique no StatusBar |
| ⏳ Pending | 🟠 | Marcar waypoint como visitado ao fazer FSDJump | Via JournalWatcher |
| ⏳ Pending | 🟠 | StatusBar atualiza em tempo real ao fazer jump | Já parcialmente implementado |
| ⏳ Pending | 🟠 | Filtro no SystemSearch por distância máxima | Input de range |

---

## Fase 3 — Melhorias de Experiência

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| ⏳ Pending | 🟡 | Indicador de progresso da rota | X/Y waypoints visitados |
| ⏳ Pending | 🟡 | Ordenação no search por distância ao sistema atual | Alternativa à ordem alfabética |
| ⏳ Pending | 🟡 | Exportar rota para clipboard | Formato texto partilhável |
| ⏳ Pending | 🟡 | Cor diferente em waypoints visitados vs pendentes | Verde/âmbar |

---

## Fase 4 — Visual e Polish

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| ⏳ Pending | 🟢 | Ícone de tipo de estrela (scoopable/non-scoopable) | Dados do journal |
| ⏳ Pending | 🟢 | Animação de conexão entre waypoints | CSS animation |
| ⏳ Pending | 🟢 | Estatísticas do histórico de journals | Nº sistemas visitados, etc |
| ⏳ Pending | 🟢 | Animação no StatusBar ao detetar novo jump | Micro-interaction |

---

## Fase 5 — APIs Externas

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| ⏳ Pending | 🟠 | Integração EDSM API | Aguarda acesso/aprovação |
| ⏳ Pending | 🟠 | Integração Spansh API | Aguarda acesso/aprovação |
| ⏳ Pending | 🟡 | Search de sistemas não visitados via API | Depende de EDSM/Spansh |
| ⏳ Pending | 🟡 | Route plotting via Spansh neutron plotter | Depende de Spansh |

---

## Fase 6 — Apresentação e Portfolio

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| ⏳ Pending | 🔵 | README.md completo com screenshots | GitHub |
| ⏳ Pending | 🔵 | Página About na app | Versão, créditos, licença |
| ⏳ Pending | 🔵 | Licença open-source | MIT recomendado |
| ⏳ Pending | 🔵 | Refactor do package name | multi-route-planner |
| ⏳ Pending | 🔵 | Build de produção e instalador Windows | electron-builder |

---

## Legenda de Estado

| Símbolo | Significado |
|---------|------------|
| ✅ Done | Implementado e testado |
| 🚧 WIP | Em desenvolvimento |
| ⏳ Pending | Aguarda implementação |
| ❌ Blocked | Bloqueado por dependência externa |
| 🔄 Revisão | Implementado, a necessitar de revisão |

---

*Última atualização: Marco 2026*
*Desenvolvido por: Luis Matos*