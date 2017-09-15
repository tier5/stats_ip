SELECT
team,
sum(games) as gplayed,
round((sum(deffantasy) / sum(games) + 0.00001)::numeric, 1) as pointspg,
round((sum(opponentoffensiveyards) / sum(games) + 0.00001)::numeric, 1) as offensiveyardspg,
round((sum(defensivetd) / sum(games) + 0.00001)::numeric, 1) as deftfdtspg,
round((sum(fumblesrecovered) / sum(games) + 0.00001)::numeric, 1) as fumblesrecoveredpg,
round((sum(opponentpassinginterceptions) / sum(games) + 0.00001)::numeric, 1) as oppassingintpg,
round((sum(opponentsacks) / sum(games) + 0.00001)::numeric, 1) as oppsackspg

FROM nflteam
WHERE team = ${team}
AND season in (${seasons:csv})
AND opponent = (${vsTeam})
AND seasontype in ('1')
GROUP BY team
