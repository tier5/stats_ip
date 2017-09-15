SELECT
team,
sum(games) as gplayed,
round((sum(score) / sum(games) + 0.00001)::numeric, 1) as scorepg, -- NFL points scored per game
round((sum(passingattempts) / sum(games) + 0.00001)::numeric, 1) as passattpg, --pass attempts per game
round((sum(rushingattempts) / sum(games) + 0.00001)::numeric, 1) as carriespg, --carries per game
round((sum(touchdowns) / sum(games) + 0.00001)::numeric, 1) as touchdownspg, --touchdowns per game
round((sum(passingyards) / sum(games) + 0.00001)::numeric, 1) as passyardspg, --passing yards per game
round((sum(rushingyards) / sum(games) + 0.00001)::numeric, 1) as rushyardspg --rushing yards per game

FROM nflteam
WHERE team = ${team}
AND season in (${seasons:csv})
AND lower(vsdefensivecoordinator) = lower(${vsdefcoor})
AND seasontype in ('1')
GROUP BY team
