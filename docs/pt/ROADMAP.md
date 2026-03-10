# Elite Dangerous Multi-Route Planner — Roteiro

> Versao atual: 0.1.0-dev
> Stack: Electron + React + Vite
> Repositorio: https://github.com/LuisMatosDev/elite-dangerous-multi-route-planner

---

## Sistema de Prioridades

| Cor | Nivel | Descricao |
|-----|-------|-----------|
| 🔴 | Critico | App nao funciona corretamente sem isto |
| 🟠 | Urgente | Impacto direto na usabilidade |
| 🟡 | Prioritario | Melhora significativamente a experiencia |
| 🟢 | Nao Urgente | Nice to have |
| 🔵 | Normal | Polish e apresentacao |

---

## Fase 1 — Core Local (atual)

| Estado | Prioridade | Feature |
|--------|-----------|---------|
| ✅ Done | 🔴 | JournalWatcher — leitura de logs em tempo real |
| ✅ Done | 🔴 | StatusBar — sistema atual, nave, jump range |
| ✅ Done | 🔴 | SystemSearch — pesquisa de sistemas visitados |
| ✅ Done | 🔴 | WaypointList — adicionar/remover/reordenar waypoints |
| ✅ Done | 🔴 | RouteCalculator — calculo de distancias e jumps locais |
| ✅ Done | 🔴 | RoutePanel — layout principal unificado |
| ✅ Done | 🔴 | WCAG 2.1 AA — acessibilidade e usabilidade |

---

## Fase 2 — Funcionalidade Essencial

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| ✅ Done | 🔴 | Guardar e carregar rotas | electron-store v8 |
| ✅ Done | 🔴 | Detecao de Elite Dangerous em execucao | Verificar processo ativo |
| ⏳ Pending | 🟠 | Botao Adicionar sistema atual como waypoint | 1 clique no StatusBar |
| ⏳ Pending | 🟠 | Marcar waypoint como visitado ao fazer FSDJump | Via JournalWatcher |
| ⏳ Pending | 🟠 | StatusBar atualiza em tempo real ao fazer jump | Ja parcialmente implementado |
| ⏳ Pending | 🟠 | Filtro no SystemSearch por distancia maxima | Input de range |

---

## Fase 3 — Melhorias de Experiencia

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| ⏳ Pending | 🟡 | Indicador de progresso da rota | X/Y waypoints visitados |
| ⏳ Pending | 🟡 | Ordenacao no search por distancia ao sistema atual | Alternativa a ordem alfabetica |
| ⏳ Pending | 🟡 | Exportar rota para clipboard | Formato texto partilhavel |
| ⏳ Pending | 🟡 | Cor diferente em waypoints visitados vs pendentes | Verde/ambar |
| ⏳ Pending | 🟡 | Seletor de nave com jump range automatico | Dados do Inara |

---

## Fase 4 — Visual e Polish

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| ⏳ Pending | 🟢 | Icone de tipo de estrela (scoopable/non-scoopable) | Dados do journal |
| ⏳ Pending | 🟢 | Animacao de conexao entre waypoints | CSS animation |
| ⏳ Pending | 🟢 | Estatisticas do historico de journals | Nr sistemas visitados, etc |
| ⏳ Pending | 🟢 | Animacao no StatusBar ao detetar novo jump | Micro-interaction |

---

## Fase 5 — APIs Externas

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| ⏳ Pending | 🟠 | Integracao EDSM API | Aguarda acesso/aprovacao |
| ⏳ Pending | 🟠 | Integracao Spansh API | Aguarda acesso/aprovacao |
| ⏳ Pending | 🟡 | Search de sistemas nao visitados via API | Depende de EDSM/Spansh |
| ⏳ Pending | 🟡 | Route plotting via Spansh neutron plotter | Depende de Spansh |

---

## Fase 6 — Apresentacao e Portfolio

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| ⏳ Pending | 🔵 | README.md completo com screenshots | GitHub |
| ⏳ Pending | 🔵 | Pagina About na app | Versao, creditos, licenca |
| ⏳ Pending | 🔵 | Licenca open-source | MIT recomendado |
| ⏳ Pending | 🔵 | Refactor do package name | multi-route-planner |
| ⏳ Pending | 🔵 | Build de producao e instalador Windows | electron-builder |

---

## Legenda de Estado

| Simbolo | Significado |
|---------|------------|
| ✅ Done | Implementado e testado |
| 🚧 WIP | Em desenvolvimento |
| ⏳ Pending | Aguarda implementacao |
| ❌ Blocked | Bloqueado por dependencia externa |
| 🔄 Revisao | Implementado, a necessitar de revisao |

---

*Ultima atualizacao: Marco 2026*
*Desenvolvido por: Luis Matos*