# Elite Dangerous Multi-Route Planner â€” Roadmap

> VersÃ£o atual: 0.1.0-dev
> Stack: Electron + React + Vite
> RepositÃ³rio: https://github.com/LuisMatosDev/elite-dangerous-multi-route-planner

---

## Sistema de Prioridades

| Cor | NÃ­vel | DescriÃ§Ã£o |
|-----|-------|-----------|
| ðŸ”´ | CrÃ­tico | App nÃ£o funciona corretamente sem isto |
| ðŸŸ  | Urgente | Impacto direto na usabilidade |
| ðŸŸ¡ | PrioritÃ¡rio | Melhora significativamente a experiÃªncia |
| ðŸŸ¢ | NÃ£o Urgente | Nice to have |
| ðŸ”µ | Normal | Polish e apresentaÃ§Ã£o |

---

## Fase 1 â€” Core Local (atual)

| Estado | Prioridade | Feature |
|--------|-----------|---------|
| âœ… Done | ðŸ”´ | JournalWatcher â€” leitura de logs em tempo real |
| âœ… Done | ðŸ”´ | StatusBar â€” sistema atual, nave, jump range |
| âœ… Done | ðŸ”´ | SystemSearch â€” pesquisa de sistemas visitados |
| âœ… Done | ðŸ”´ | WaypointList â€” adicionar/remover/reordenar waypoints |
| âœ… Done | ðŸ”´ | RouteCalculator â€” cÃ¡lculo de distÃ¢ncias e jumps locais |
| âœ… Done | ðŸ”´ | RoutePanel â€” layout principal unificado |
| âœ… Done | ðŸ”´ | WCAG 2.1 AA â€” acessibilidade e usabilidade |

---

## Fase 2 â€” Funcionalidade Essencial

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| â³ Pending | ðŸ”´ | Guardar e carregar rotas | Usar electron-store |
| â³ Pending | ðŸ”´ | DeteÃ§Ã£o de Elite Dangerous em execuÃ§Ã£o | Verificar processo ativo |
| â³ Pending | ðŸŸ  | BotÃ£o "Adicionar sistema atual" como waypoint | 1 clique no StatusBar |
| â³ Pending | ðŸŸ  | Marcar waypoint como visitado ao fazer FSDJump | Via JournalWatcher |
| â³ Pending | ðŸŸ  | StatusBar atualiza em tempo real ao fazer jump | JÃ¡ parcialmente implementado |
| â³ Pending | ðŸŸ  | Filtro no SystemSearch por distÃ¢ncia mÃ¡xima | Input de range |

---

## Fase 3 â€” Melhorias de ExperiÃªncia

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| â³ Pending | ðŸŸ¡ | Indicador de progresso da rota | X/Y waypoints visitados |
| â³ Pending | ðŸŸ¡ | OrdenaÃ§Ã£o no search por distÃ¢ncia ao sistema atual | Alternativa Ã  ordem alfabÃ©tica |
| â³ Pending | ðŸŸ¡ | Exportar rota para clipboard | Formato texto partilhÃ¡vel |
| â³ Pending | ðŸŸ¡ | Cor diferente em waypoints visitados vs pendentes | Verde/Ã¢mbar |

---

## Fase 4 â€” Visual e Polish

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| â³ Pending | ðŸŸ¢ | Ãcone de tipo de estrela (scoopable/non-scoopable) | Dados do journal |
| â³ Pending | ðŸŸ¢ | AnimaÃ§Ã£o de conexÃ£o entre waypoints | CSS animation |
| â³ Pending | ðŸŸ¢ | EstatÃ­sticas do histÃ³rico de journals | NÂº sistemas visitados, etc |
| â³ Pending | ðŸŸ¢ | AnimaÃ§Ã£o no StatusBar ao detetar novo jump | Micro-interaction |

---

## Fase 5 â€” APIs Externas

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| â³ Pending | ðŸŸ  | IntegraÃ§Ã£o EDSM API | Aguarda acesso/aprovaÃ§Ã£o |
| â³ Pending | ðŸŸ  | IntegraÃ§Ã£o Spansh API | Aguarda acesso/aprovaÃ§Ã£o |
| â³ Pending | ðŸŸ¡ | Search de sistemas nÃ£o visitados via API | Depende de EDSM/Spansh |
| â³ Pending | ðŸŸ¡ | Route plotting via Spansh neutron plotter | Depende de Spansh |

---

## Fase 6 â€” ApresentaÃ§Ã£o e Portfolio

| Estado | Prioridade | Feature | Notas |
|--------|-----------|---------|-------|
| â³ Pending | ðŸ”µ | README.md completo com screenshots | GitHub |
| â³ Pending | ðŸ”µ | PÃ¡gina About na app | VersÃ£o, crÃ©ditos, licenÃ§a |
| â³ Pending | ðŸ”µ | LicenÃ§a open-source | MIT recomendado |
| â³ Pending | ðŸ”µ | Refactor do package name | multi-route-planner |
| â³ Pending | ðŸ”µ | Build de produÃ§Ã£o e instalador Windows | electron-builder |

---

## Legenda de Estado

| SÃ­mbolo | Significado |
|---------|------------|
| âœ… Done | Implementado e testado |
| ðŸš§ WIP | Em desenvolvimento |
| â³ Pending | Aguarda implementaÃ§Ã£o |
| âŒ Blocked | Bloqueado por dependÃªncia externa |
| ðŸ”„ RevisÃ£o | Implementado, a necessitar de revisÃ£o |

---

*Ãšltima atualizaÃ§Ã£o: Marco 2026*
*Desenvolvido por: Luis Matos*